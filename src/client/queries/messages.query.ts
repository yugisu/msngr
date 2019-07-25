import gql from 'graphql-tag';

export const GET_MESSAGES = gql`
  query {
    messages {
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
`;
