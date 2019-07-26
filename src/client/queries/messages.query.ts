import gql from 'graphql-tag';

export const GET_MESSAGES = gql`
  query GetMessages($filter: String, $after: ID) {
    messages(filter: $filter, first: 15, after: $after) {
      count
      items {
        id
        body
        likes
        dislikes
        createdAt
        replies {
          id
          body
          createdAt
        }
      }
    }
  }
`;
