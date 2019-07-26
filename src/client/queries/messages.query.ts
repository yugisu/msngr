import gql from 'graphql-tag';

export const GET_MESSAGES = gql`
  query GetMessages($filter: String, $after: ID, $orderBy: MessageOrdering) {
    messages(filter: $filter, first: 15, after: $after, orderBy: $orderBy) {
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
