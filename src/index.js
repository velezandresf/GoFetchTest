import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/pages/app/App';
import './index.css';
import { UserContextProvider } from './context/userContext';
import { ApolloProvider } from '@apollo/client';
import { client } from './config/ApolloClient.config';

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
