import JsonSourceClient from "./json_source_client";

const client = JsonSourceClient();

async function handleSinglePromise(promise) {
  // Perform more actions on the promise here. E.g Getting related promises instead of having them in the json file.
  return promise;
}

async function handlePromises(promises) {
  // Perform more actions on the promises here
  return promises;
}

const promiseSource = () => {
  const api = {
    promises: async ({ limit }) => {
      return client
        .query({ query: "GET_PROMISES", limit })
        .then(handlePromises);
    },
    keyPromises: async ({ limit }) => {
      return client
        .query({ query: "GET_KEY_PROMISES", limit })
        .then(handlePromises);
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
      return client
        .query({ query: "GET_PROMISE", id })
        .then(handleSinglePromise);
    },
  };
  return api;
};

export default promiseSource;
