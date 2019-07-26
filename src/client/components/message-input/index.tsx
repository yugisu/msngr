import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { POST_MESSAGE } from 'client/queries/post-message.mutation';
import { IMessage } from 'client/generated/ql-types';

import './styles.scss';

export function MessageInput() {
  const [text, setText] = useState('');

  const [sendMessage, { loading }] = useMutation<IMessage, { body: string }>(
    POST_MESSAGE
  );

  const onChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;

    setText(target.value);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (text) {
      sendMessage({ variables: { body: text } });
      setText('');
    }
  };

  return (
    <form className='message-input' onSubmit={onSubmit}>
      <input
        type='text'
        className='message-input__field'
        placeholder='Enter your message here...'
        value={text}
        onChange={onChange}
        disabled={false}
      />
      <button className='message-input__send' disabled={loading}>
        Send
      </button>
    </form>
  );
}
