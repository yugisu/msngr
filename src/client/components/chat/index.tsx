import React, { useState, useEffect } from 'react';

import { useMessages } from './use-messages.hook';

import { ChatHeader } from './chat-header';
import { Messages } from 'client/components/messages';
import { MessageInput } from 'client/components/message-input';

import './styles.scss';

let filterTimeout: any;

export function Chat() {
  const [filter, setFilter] = useState('');

  const { data, loading, error, fetchMoreMessages, refetch } = useMessages();

  useEffect(() => {
    if (filterTimeout) clearTimeout(filterTimeout);

    filterTimeout = setTimeout(() => refetch({ filter }), 450);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  if (error) {
    return <div className='chat'>Uh oh! {error.message}</div>;
  }

  const onFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  return (
    <div className='chat'>
      <ChatHeader>
        <span>
          Anonymous chat{' '}
          {loading
            ? ''
            : data && data.messages.items
            ? `• ${data.messages.count} messages (loaded ${data.messages.items.length})`
            : ''}
        </span>
        <label>
          <span role='img' aria-hidden>
            🔎
          </span>
          <input
            type='text'
            value={filter}
            onChange={onFilterChange}
            placeholder='Filter messages'
          />
        </label>
      </ChatHeader>
      <MessageInput />
      {loading ? (
        <div className='messages'>
          <div>
            <div className='message'>Loading...</div>
          </div>
        </div>
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
