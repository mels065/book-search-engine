const {
    me,
    addUser,
    login,
    saveBook,
    removeBook
} = require('../controllers/user-controller');

const resolvers = {
    Query: {
        me
    },
    Mutation: {
        addUser,
        login,
        saveBook,
        removeBook
    }
};

module.exports = resolvers;
