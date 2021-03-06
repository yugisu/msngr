import { useQuery } from '@apollo/react-hooks';

import { IMessage, IMessages } from 'client/generated/ql-types';

import { GET_MESSAGES } from 'client/queries/messages.query';
import { MESSAGES_SUBSCRIPTION } from 'client/queries/messages.subscription';

type Args = {
  filter?: string;
};

export function useMessages(args?: Args) {
  const { data, loading, error, subscribeToMore, fetchMore, refetch } = useQuery<{
    messages: IMessages;
  }>(GET_MESSAGES, args ? { variables: { filter: args.filter } } : undefined);

  subscribeToMore<{ message: IMessage }>({
    document: MESSAGES_SUBSCRIPTION,
    updateQuery: (prev, { subscriptionData, variables }) => {
      if (!subscriptionData.data) return prev;
      const { message } = subscriptionData.data;

      const existsIdx = prev.messages.items!.findIndex((m) => {
        if (m.id === message.id) {
          if (m.replies && message.replies) {
            return m.replies.length === message.replies.length;
          }

          return m.replies === message.replies;
        }

        return m.id === message.id;
      });
      if (existsIdx > -1)
        return {
          messages: {
            ...prev.messages,
            items: prev.messages.items!.map((m) =>
              m.id === message.id ? { ...m, ...message } : m
            ),
          },
        };

      if (prev.messages.items) {
        const shouldBeAdded =
          variables && variables.filter ? message.body.includes(variables.filter) : true;

        if (shouldBeAdded) {
          return {
            messages: {
              __typename: prev.messages.__typename,
              items: [message, ...prev.messages.items],
              count: prev.messages.count + 1,
            },
          };
        }
      }
      return prev;
    },
  });

  const fetchMoreMessages = () => {
    if (data && data.messages.items && data.messages.items.length) {
      const edgeMessageId = data.messages.items[data.messages.items.length - 1].id;

      fetchMore({
        variables: { after: edgeMessageId },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;

          if (prev && prev.messages.items && fetchMoreResult.messages.items) {
            return {
              messages: {
                ...prev.messages,
                items: [...prev.messages.items, ...fetchMoreResult.messages.items],
              },
            };
          }

          return prev;
        },
      });
    }
  };

  return { data, loading, error, fetchMoreMessages, refetch };
}
