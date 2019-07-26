import React, { PropsWithChildren } from 'react';

import './styles.scss';

export function ChatHeader({ children }: PropsWithChildren<{}>) {
  return <header className='chat-header'>{children}</header>;
}
