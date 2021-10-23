import { gql } from '@apollo/client';

export const QUERY_ME = gql`
    query queryMe {
        me {
            username
            email
            savedBooks
        }
    }
`;
