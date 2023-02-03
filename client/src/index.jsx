import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as RouterProvider } from 'react-router-dom';
import { client } from './apollo/client';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <ChakraProvider>
      <RouterProvider>
        <App />
      </RouterProvider>
    </ChakraProvider>
  </ApolloProvider>
);
