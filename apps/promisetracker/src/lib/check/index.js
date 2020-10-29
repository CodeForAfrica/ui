import {
  GET_PROMISES,
  GET_PROMISES_BY_CATEGORIES,
} from "@/promisetracker/lib/check/gql";

import createApolloClient from "./createApolloClient";

const UNSPECIFIED_TEAM = "unspecified";
const CLIENT_PER_TEAM = new Map();

function check(team = undefined, initialState = {}) {
  const clientTeam = team || UNSPECIFIED_TEAM;
  const existingClient = CLIENT_PER_TEAM.get(clientTeam);
  const client = existingClient || createApolloClient(initialState, team);
  if (!existingClient) {
    CLIENT_PER_TEAM.set(clientTeam, existingClient);
  }

  const api = {
    promises: async (variables) => {
      return client.query({ query: GET_PROMISES, variables }).then((res) => {
        return res.data.search.medias.edges.map((promise) => promise.node);
      });
    },
    promisesByCategories: async (variables) => {
      return client
        .query({ query: GET_PROMISES_BY_CATEGORIES, variables })
        .then(({ data }) => ({
          id: data.team.id,
          count: data.team.medias_count,
          name: data.team.name,
          categories: data.team.projects.edges.map(({ node }) => ({
            id: node.id,
            title: node.title,
            count: node.medias_count,
            projects: node.project_medias.edges.map((promise) => promise.node),
          })),
        }));
    },
  };
  return api;
}

export default check;
