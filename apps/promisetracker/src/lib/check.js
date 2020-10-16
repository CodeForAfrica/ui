import { GET_PROMISES, GET_TEAMS } from "@/promisetracker/graphql";

import createApolloClient from "./createApolloClient";

const client = createApolloClient();

const check = {
  promises: async () => {
    return client.query({ query: GET_PROMISES });
  },
  teams: async () => {
    return client.query({ query: GET_TEAMS });
  },
};

export default check;
