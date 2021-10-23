const {
    me,
    addUser,
    login,
    saveBook
} = require('../controllers/user-controller');

const resolvers = {
    Query: {
        me
    },
    Mutation: {
        addUser,
        login,
        saveBook
    }
};

module.exports = resolvers;
