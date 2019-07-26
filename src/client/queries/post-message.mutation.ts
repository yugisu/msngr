import gql from 'graphql-tag';

export const POST_MESSAGE = gql`
  mutation PostMessageMutation($body: String!) {
    postMessage(body: $body) {
      id
      body
    }
  }
`;
