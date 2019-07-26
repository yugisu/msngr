import gql from 'graphql-tag';

export const POST_REPLY = gql`
  mutation PostReplyMutation($messageId: ID!, $body: String!) {
    postReply(messageId: $messageId, body: $body) {
      id
    }
    updateMessage(messageId: $messageId) {
      id
    }
  }
`;
