import React from 'react';
import './App.css';
import MainComponent from './main';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';


const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri:'http://localhost:4000/graphql',
    }),
    cache: new InMemoryCache(),
  });
 };

 const client = createApolloClient();

function App() {
  return (
    <ApolloProvider client={client}>
    <article className="baskerville pb5">
        <div className="avenir tc-l ph3 ph4-ns pt4 pt5-ns">
                <MainComponent />
        </div>
      </article>
      </ApolloProvider>
  );
}

export default App;
