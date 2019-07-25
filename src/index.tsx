import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooks } from '@apollo/react-hooks';
import { ApolloClient, split, InMemoryCache } from 'apollo-boost';
import { createHttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { BrowserRouter } from 'react-router-dom';
import { getMainDefinition } from 'apollo-utilities';

import { App } from 'client/components/app';
import * as serviceWorker from 'client/serviceWorker';

import 'client/index.scss';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
});

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000',
  options: {
    reconnect: true,
  },
});

const link = split(
  ({ query }) => {
    const def = getMainDefinition(query);

    return def.kind === 'OperationDefinition' && def.operation === 'subscription';
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <ApolloHooks client={client}>
        <App />
      </ApolloHooks>
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
