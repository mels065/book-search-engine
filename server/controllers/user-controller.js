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
  async addUser(parent, args) {
    const user = await User.create(args);

    if (!user) {
      throw new UserInputError('User could not be created');
    }
    const token = signToken(user);
    return { token, user };
  },
  // login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
  // {body} is destructured req.body
  async login(parent, args) {
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
  async saveBook(parent, args, context) {
    const { user } = context;
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $addToSet: { savedBooks: args } },
        { new: true, runValidators: true }
      );
      return updatedUser;
    } catch (err) {
      throw new UserInputError(err);
    }
  },
  // remove a book from `savedBooks`
  async removeBook(parent, args, context) {
    const { user } = context;
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      { $pull: { savedBooks: { bookId: args.bookId } } },
      { new: true }
    );
    if (!updatedUser) {
      throw new Error("Something went wrong with retrieving user data");
    }
    return updatedUser;
  },
};
