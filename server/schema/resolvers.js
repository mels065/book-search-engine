const { createUser } = require('../controllers/user-controller');

const resolvers = {
    Query: {
        test: () => "Hello World"
    },
    Mutation: {
        createUser
    }
};

module.exports = resolvers;
