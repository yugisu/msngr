import React from 'react';

import { Messages } from 'client/components/messages';
import { MessageInput } from 'client/components/message-input';

import './styles.scss';

export function Chat() {
  return (
    <div className='chat'>
      <div className='chat__header' />
      <Messages />
      <MessageInput />
    </div>
  );
}
