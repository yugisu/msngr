import gql from 'graphql-tag';

export const MESSAGES_SUBSCRIPTION = gql`
  subscription onMessage {
    message {
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
