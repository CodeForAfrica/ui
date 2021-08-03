import JsonSourceClient from "./json_source_client";

const client = JsonSourceClient();

const promiseSource = () => {
  const api = {
    promises: async ({ limit }) => {
      return client.query({ query: "GET_PROMISES", limit }).then((response) => {
        return response;
      });
    },
    promisesByCategories: async (category) => {
      return client
        .query({ query: "GET_PROMISES_BY_CATEGORY", category })
        .then((response) => {
          return response;
        });
    },
    projectMeta: async () => {
      return {
        tags: client.getTags(),
      };
    },
    promise: async ({ id }) => {
      return client.query({ query: "GET_PROMISE", id }).then((response) => {
        return response;
      });
    },
  };
  return api;
};

export default promiseSource;
