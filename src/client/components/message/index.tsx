import React from 'react';
import moment from 'moment';

import { IMessage } from 'client/generated/ql-types';

import './styles.scss';

type Props = {
  message: IMessage;
};

export function Message({ message }: Props) {
  return (
    <div className='message'>
      <h4 className='message__name'>#{message.id.slice(-10)}</h4>
      <p className='message__body'>{message.body}</p>
      <h6 className='message__time'>{moment(message.createdAt).format('hh:mm a')}</h6>
    </div>
  );
}
