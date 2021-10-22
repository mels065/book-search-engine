const {
    createUser,
    login
} = require('../controllers/user-controller');

const resolvers = {
    Query: {
        test: () => "Hello World"
    },
    Mutation: {
        createUser,
        login
    }
};

module.exports = resolvers;
