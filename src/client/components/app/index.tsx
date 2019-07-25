import React from 'react';

import { AppHeader } from 'client/components/app-header';
import { Chat } from 'client/components/chat';

import './styles.scss';

export function App() {
  return (
    <div className='app'>
      <AppHeader />
      <main className='app-body'>
        <Chat />
      </main>
    </div>
  );
}
