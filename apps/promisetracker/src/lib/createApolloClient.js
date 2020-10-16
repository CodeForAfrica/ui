import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";

import config from "@/promisetracker/config";

export default function createApolloClient(initialState = {}) {
  return new ApolloClient({
    ssrMode: typeof window === "undefined", // Disables forceFetch on the server (so queries are only run once)
    link: new HttpLink({
      uri: config.GRAPHQL_URI, // Server URL (must be absolute)
      // credentials: 'include', // Additional fetch() options like `credentials` or `headers`
      headers: {
        "X-Check-Token": process.env.CHECK_ACCESS_TOKEN,
      },
      fetch,
    }),
    cache: new InMemoryCache().restore(initialState),
  });
}
