const { UserInputError } = require('apollo-server-express')

// import user model
const { User } = require('../models');
// import sign token function from auth
const { signToken } = require('../utils/auth');

module.exports = {
  // get a single user by either their id or their username
  async me(parent, args, context) {
    const { user, params } = context;
    const foundUser = await User.findOne({
      $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
    });

    if (!foundUser) {
      throw new Error('Something went wrong');
    }

    return foundUser;
  },
  // create a user, sign a token, and send it back (to client/src/components/SignUpForm.js)
  async addUser(_, args) {
    const user = await User.create(args);

    if (!user) {
      throw new UserInputError('User could not be created');
    }
    const token = signToken(user);
    return { token, user };
  },
  // login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
  // {body} is destructured req.body
  async login(_, args) {
    const { username, email, password } = args;
    const user = await User.findOne({ $or: [{ username }, { email }] });
    if (!user) {
      throw new UserInputError("Can't find this user");
    }

    const correctPw = await user.isCorrectPassword(password);

    if (!correctPw) {
      throw new  UserInputError('Wrong password!');
    }
    const token = signToken(user);
    return { token, user };
  },
  // save a book to a user's `savedBooks` field by adding it to the set (to prevent duplicates)
  // user comes from `req.user` created in the auth middleware function
  async saveBook({ user, body }, res) {
    console.log(user);
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $addToSet: { savedBooks: body } },
        { new: true, runValidators: true }
      );
      return res.json(updatedUser);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },
  // remove a book from `savedBooks`
  async deleteBook({ user, params }, res) {
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      { $pull: { savedBooks: { bookId: params.bookId } } },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "Couldn't find user with this id!" });
    }
    return res.json(updatedUser);
  },
};
