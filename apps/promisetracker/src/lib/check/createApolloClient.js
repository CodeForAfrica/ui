import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";

import config from "@/promisetracker/config";

export default function createApolloClient(
  initialState = {},
  team = undefined
) {
  const { GRAPHQL_URI } = config;
  const uri = team ? `${GRAPHQL_URI}?team=${team}` : GRAPHQL_URI;

  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: new HttpLink({
      headers: {
        "X-Check-Token": process.env.CHECK_ACCESS_TOKEN,
      },
      uri,
    }),
    cache: new InMemoryCache().restore(initialState),
  });
}
