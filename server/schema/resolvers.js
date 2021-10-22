const {
    addUser,
    login
} = require('../controllers/user-controller');

const resolvers = {
    Query: {
        test: () => "Hello World"
    },
    Mutation: {
        addUser,
        login
    }
};

module.exports = resolvers;
