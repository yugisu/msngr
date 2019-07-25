import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { IMessage } from 'client/generated/ql-types';
import { GET_MESSAGES } from 'client/queries/messages.query';
import { MESSAGES_SUBSCRIPTION } from 'client/queries/messages.subscription';
import { Message } from 'client/components/message';

import './styles.scss';

export function Messages() {
  const { data, loading, error, subscribeToMore } = useQuery<{
    messages: IMessage[];
    message?: IMessage;
  }>(GET_MESSAGES);

  subscribeToMore({
    document: MESSAGES_SUBSCRIPTION,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev;
      const { message } = subscriptionData.data;

      if (!message) return prev;

      const exists = prev.messages.find((m) => m.id === message.id);
      if (exists) return prev;

      return { ...prev, messages: [...prev.messages, message] };
    },
  });

  if (loading) {
    return <div className='messages'>Loading...</div>;
  }

  if (error) {
    return <div className='messages'>Uh oh! {error.message}</div>;
  }

  if (data) {
    const { messages } = data;

    return (
      <div className='messages'>
        {messages.map((m) => (
          <Message message={m} key={m.id} />
        ))}
      </div>
    );
  }

  return null;
}
