/* eslint-disable react-hooks/exhaustive-deps */

import { useMemo } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { CHANGE_REACTION } from 'client/queries/like-dislike.mutation';

export function useLikes() {
  const [QswapReaction, { loading }] = useMutation(CHANGE_REACTION);

  const liked: Set<string> = useMemo(
    () => new Set(JSON.parse(window.localStorage.getItem('messagesLiked') || '[]')),
    [loading]
  );
  const disliked: Set<string> = useMemo(
    () => new Set(JSON.parse(window.localStorage.getItem('messagesDisliked') || '[]')),
    [loading]
  );

  const getStatus = (messageId: string): 'liked' | 'disliked' | undefined => {
    return liked.has(messageId)
      ? 'liked'
      : disliked.has(messageId)
      ? 'disliked'
      : undefined;
  };

  const changeReaction = (messageId: string) => (
    likesAmount: number,
    dislikesAmount: number
  ) => {
    QswapReaction({
      variables: {
        messageId,
        likesAmount,
        dislikesAmount,
      },
    });

    if (likesAmount > 0) liked.add(messageId);
    else if (likesAmount < 0) liked.delete(messageId);

    if (dislikesAmount > 0) disliked.add(messageId);
    else if (dislikesAmount < 0) disliked.delete(messageId);

    window.localStorage.setItem('messagesLiked', JSON.stringify([...liked]));
    window.localStorage.setItem('messagesDisliked', JSON.stringify([...disliked]));
  };

  const likeMessage = (messageId: string) => () => {
    if (!loading) {
      const status = getStatus(messageId);
      const react = changeReaction(messageId);

      if (status === undefined) {
        react(1, 0);
      } else if (status === 'liked') {
        react(-1, 0);
      } else if (status === 'disliked') {
        react(1, -1);
      }
    }
  };

  const dislikeMessage = (messageId: string) => () => {
    if (!loading) {
      const status = getStatus(messageId);
      const react = changeReaction(messageId);

      if (status === undefined) {
        react(0, 1);
      } else if (status === 'disliked') {
        react(0, -1);
      } else if (status === 'liked') {
        react(-1, 1);
      }
    }
  };

  return { liked, disliked, likeMessage, dislikeMessage };
}
