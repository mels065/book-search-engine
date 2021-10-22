const {
    me,
    addUser,
    login
} = require('../controllers/user-controller');

const resolvers = {
    Query: {
        me
    },
    Mutation: {
        addUser,
        login
    }
};

module.exports = resolvers;
