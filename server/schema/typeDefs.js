const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Book {
        authors: [String]
        description: String
        bookId: String
        image: String
        link: String
        title: String
    }

    type User {
        username: String
        email: String
        savedBooks: [Book]
    }

    type Token {
        token: String
        user: User
    }

    type Query {
        test: String
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): Token
    }
`;

module.exports = typeDefs;
