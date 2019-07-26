import gql from 'graphql-tag';

export const CHANGE_REACTION = gql`
  mutation ChangeReaction($messageId: ID!, $likesAmount: Int!, $dislikesAmount: Int!) {
    likeMessage(messageId: $messageId, amount: $likesAmount) {
      id
    }

    dislikeMessage(messageId: $messageId, amount: $dislikesAmount) {
      id
    }
  }
`;
