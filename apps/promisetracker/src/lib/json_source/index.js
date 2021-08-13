import JsonSourceClient from "./json_source_client";

const client = JsonSourceClient();

function handleSinglePromise(defaultStatus, promiseStatuses, promise) {
  const p = promise;
  let matchingStatus = promiseStatuses.find(
    (currentStatus) => currentStatus.title === promise.status.title
  );
  matchingStatus = matchingStatus || defaultStatus;
  p.status = matchingStatus;

  return p;
}

function handlePromises(defaultStatus, promiseStatuses, promises) {
  return promises.map((promise) => {
    return handleSinglePromise(defaultStatus, promiseStatuses, promise);
  });
}

const promiseSource = ({ promiseStatuses }) => {
  const defaultStatus = promiseStatuses.find(
    (status) => status.title === "Inconclusive"
  );

  const api = {
    promises: async ({ limit }) => {
      return client
        .query({ query: "GET_PROMISES", limit })
        .then((promises) =>
          handlePromises(defaultStatus, promiseStatuses, promises)
        );
    },
    keyPromises: async ({ limit }) => {
      return client
        .query({ query: "GET_KEY_PROMISES", limit })
        .then((promises) =>
          handlePromises(defaultStatus, promiseStatuses, promises)
        );
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
        .then((promise) =>
          handleSinglePromise(defaultStatus, promiseStatuses, promise)
        );
    },
  };
  return api;
};

export default promiseSource;
