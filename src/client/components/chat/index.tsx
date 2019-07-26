/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from 'react';

import { useMessages } from './use-messages.hook';
import { IMessageOrdering } from 'client/generated/ql-types';

import { ChatHeader } from './chat-header';
import { Messages } from 'client/components/messages';
import { MessageInput } from 'client/components/message-input';

import './styles.scss';

let fetchTimeout: any;

export function Chat() {
  const [filter, setFilter] = useState('');
  const [orderBy, setOrderBy] = useState<IMessageOrdering>('createdAt_DESC');

  const { data, loading, error, fetchMoreMessages, refetch } = useMessages();

  useEffect(() => {
    if (fetchTimeout) clearTimeout(fetchTimeout);

    // Not initial render
    if (data !== undefined) {
      fetchTimeout = setTimeout(() => refetch({ filter, orderBy }), 450);
    }
  }, [filter, orderBy]);

  if (error) {
    return <div className='chat'>Uh oh! {error.message}</div>;
  }

  const onLoadMore = () => {
    if (fetchTimeout) clearTimeout(fetchTimeout);
    fetchMoreMessages();
  };

  const onFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const onOrderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrderBy(e.target.value as IMessageOrdering);
  };

  return (
    <div className='chat'>
      <ChatHeader>
        <span>
          Anonymous chat{' '}
          {loading
            ? ''
            : data && data.messages && data.messages.items
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
        data.messages &&
        data.messages.items && (
          <Messages
            messages={data.messages.items}
            count={data.messages.count}
            onLoadMore={onLoadMore}
          />
        )
      )}

      <div className='chat__tooltip'>
        <div className='chat__tooltip__sort' onChange={onOrderChange}>
          <h6>Sort</h6>
          <label>
            <input
              type='radio'
              name='message-ordering'
              value='createdAt_DESC'
              defaultChecked={orderBy === 'createdAt_DESC'}
            />
            <span role='img' aria-label='Sort messages by creation time'>
              🕒
            </span>
          </label>
          <label>
            <input
              type='radio'
              name='message-ordering'
              value='likes_DESC'
              defaultChecked={orderBy === 'likes_DESC'}
            />
            <span role='img' aria-label='Sort messages by like amount'>
              👍
            </span>
          </label>
          <label>
            <input
              type='radio'
              name='message-ordering'
              value='dislikes_DESC'
              defaultChecked={orderBy === 'dislikes_DESC'}
            />
            <span role='img' aria-label='Sort messages by dislike amount'>
              👎
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}
