import React from "react";
import ReactDOM from "react-dom";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { AnagramApp } from "./app/AnagramApp";

export const link = createHttpLink({
  uri: process.env.REACT_APP_SERVER_ENDPOINT,
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

function App() {
  return ReactDOM.render(
    <ApolloProvider client={client}>
      <AnagramApp />
    </ApolloProvider>,
    document.getElementById("root")
  );
}
export default App;
