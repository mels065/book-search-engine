import { gql } from '@apollo/client';

export const ADD_USER = gql`
    mutation {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                username
                email
                savedBooks {
                    authors
                    description
                    bookId
                    image
                    link
                    title
                }
            }
        }
    }
`;

export const LOGIN = gql`
    mutation {
        login(username: $username, email: $email, password: $password) {
            token
            user {
                username
                email
                savedBooks {
                    authors
                    description
                    bookId
                    image
                    link
                    title
                }
            }
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation {
        saveBook(
            authors: $authors,
            description: $description,
            title: $title,
            bookId: $bookId,
            image: $image,
            link: $link
        ) {
            username
            email
            savedBooks {
                authors
                description
                bookId
                image
                link
                title
            }
        }
    }
`;

export const REMOVE_BOOK = gql`
    mutation {
        removeBook(bookId: $bookId) {
            username
            email
            savedBooks {
                authors
                description
                bookId
                image
                link
                title
            }
        }
    }
`;
