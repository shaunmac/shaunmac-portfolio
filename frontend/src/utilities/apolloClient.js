import {
    ApolloClient,
    createHttpLink,
    InMemoryCache
  } from "@apollo/client/core";

// !important Set to true if you are running locally
export const isLocal = true;

// Set the URL for the GraphQL endpoint
const testing = "http://shaunmac.local/graphql";
const live = "https://shaunmacdougall.com/graphql";

const httpLink = createHttpLink({
  uri: isLocal ? testing : live,
});

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default apolloClient;