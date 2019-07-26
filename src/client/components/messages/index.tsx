import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import { IMessage } from 'client/generated/ql-types';

import { Message } from 'client/components/message';

import './styles.scss';

type Props = {
  count: number;
  messages: IMessage[];
  onLoadMore: () => void;
};

export function Messages({ messages, count, onLoadMore }: Props) {
  return (
    <div className='messages'>
      <InfiniteScroll
        hasMore={messages.length < count}
        loadMore={onLoadMore}
        threshold={300}
        loader={<div key='m-loader'>Fetching...</div>}
        useWindow={false}
      >
        {messages && messages.map((m) => <Message message={m} key={m.id} />)}
      </InfiniteScroll>
    </div>
  );
}
