import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import { IMessage } from 'client/generated/ql-types';
import { useLikes } from './use-likes.hook';

import { Message } from 'client/components/message';

import './styles.scss';

type Props = {
  count: number;
  messages: IMessage[];
  onLoadMore: () => void;
};

export function Messages({ messages, count, onLoadMore }: Props) {
  const { liked, disliked, likeMessage, dislikeMessage } = useLikes();

  return (
    <div className='messages'>
      <InfiniteScroll
        hasMore={messages.length < count}
        loadMore={onLoadMore}
        threshold={300}
        loader={
          <div className='message' key='m-loader'>
            Fetching...
          </div>
        }
        useWindow={false}
      >
        {messages &&
          messages.map((m) => (
            <Message
              message={m}
              key={m.id}
              liked={liked.has(m.id)}
              disliked={disliked.has(m.id)}
              onLike={likeMessage(m.id)}
              onDislike={dislikeMessage(m.id)}
            />
          ))}
      </InfiniteScroll>
    </div>
  );
}
