import config from 'config';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';

export default initialState => {
  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  const isBrowser = typeof window !== 'undefined';
  const headers = !isBrowser && {
    'X-Check-Token': process.env.CHECK_ACCESS_TOKEN,
    Origin: config.url,
    'X-Requested-With': 'XMLHttpRequest'
  };
  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
    link: new HttpLink({
      headers,
      uri: config.PROXY_URL + config.GRAPHQL_URI, // Server URL (must be absolute)
      // Use fetch() polyfill on the server
      fetch: !isBrowser && fetch
    }),
    cache: new InMemoryCache().restore(initialState || {})
  });
};
