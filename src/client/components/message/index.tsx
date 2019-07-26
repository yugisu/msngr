import moment from 'moment';
import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { IMessage } from 'client/generated/ql-types';
import { POST_REPLY } from 'client/queries/post-reply.mutation';

import './styles.scss';

type BaseProps = {
  message: Omit<IMessage, 'replies' | '__typename' | 'updatedAt'>;
};

function MessageBase({ message }: BaseProps) {
  return (
    <>
      <h4 className='message__name'>#{message.id.slice(-10)}</h4>
      <p className='message__body'>{message.body}</p>
      <h6 className='message__time'>{moment(message.createdAt).format('hh:mm a')}</h6>
    </>
  );
}

type Props = {
  message: IMessage;
};

export function Message({ message }: Props) {
  const [replyForm, setReplyForm] = useState({ show: false, body: '' });
  const [postReply] = useMutation(POST_REPLY);

  const toggleReply = () => {
    setReplyForm((v) => ({ show: !v.show, body: '' }));
  };

  const onInput = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setReplyForm((v) => ({ ...v, body: target.value }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (replyForm.body) {
      postReply({ variables: { messageId: message.id, body: replyForm.body } });
      setReplyForm({ show: false, body: '' });
    }
  };

  return (
    <>
      {message.replies &&
        message.replies.map((r) => {
          return (
            <div className='message message--reply' key={r.id}>
              <span className='message__reply'>
                <i>>&nbsp;#{message.id.slice(-10)}</i>
              </span>
              <MessageBase message={r} />
            </div>
          );
        })}
      {replyForm.show && (
        <form className='message__reply-form' onSubmit={onSubmit}>
          <input
            className='message__reply-form__input'
            value={replyForm.body}
            onChange={onInput}
            placeholder='Your reply here...'
          />
          <button className='message__reply' type='submit'>
            Send
          </button>
        </form>
      )}
      <div className='message'>
        <MessageBase message={message} />
        <button className='message__reply' onClick={toggleReply}>
          {replyForm.show ? 'Close reply' : 'Reply'}
        </button>
      </div>
    </>
  );
}
