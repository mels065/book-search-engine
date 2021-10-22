const { gql } = require('apollo-server-express');

const typeDefs = gql`
    Book {
        authors: [String]
        description: String
        bookId: String
        image: String
        link: String
        title: String
    }

    User {
        username: String
        email: String
        savedBooks: [Book]
    }

    type Query {
        test: String
    }
`;

module.exports = typeDefs;
