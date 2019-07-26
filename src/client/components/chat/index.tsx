import React from 'react';

import { useMessages } from './use-messages.hook';

import { Messages } from 'client/components/messages';
import { MessageInput } from 'client/components/message-input';

import './styles.scss';

export function Chat() {
  const { data, loading, error, fetchMoreMessages } = useMessages();

  if (error) {
    return <div className='chat'>Uh oh! {error.message}</div>;
  }

  return (
    <div className='chat'>
      <div className='chat__header'>
        Anonymous chat{' '}
        {loading
          ? ''
          : data && data.messages.items
          ? `• ${data.messages.count} messages (loaded ${data.messages.items.length})`
          : ''}
      </div>
      <MessageInput />
      {loading ? (
        <div className='messages'>Loading...</div>
      ) : (
        data &&
        data.messages.items && (
          <Messages
            messages={data.messages.items}
            count={data.messages.count}
            onLoadMore={fetchMoreMessages}
          />
        )
      )}
    </div>
  );
}
