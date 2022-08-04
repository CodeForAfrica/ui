import promisesQL from "@/promisetracker/lib/jsonql/promises";

const client = promisesQL([]);
const allPromises = client.getPromises();

function handleSinglePromise(defaultStatus, promiseStatuses, promise) {
  let matchingStatus = promiseStatuses.find(
    (currentStatus) => currentStatus.title === promise.status.title
  );
  matchingStatus = matchingStatus || defaultStatus;
  const relatedPromises = allPromises.filter(
    (p) =>
      p.slug !== promise.slug &&
      promise.categories.some((v) => p.categories.includes(v))
  );

  return {
    ...promise,
    relatedPromises: relatedPromises.slice(0, 3),
    status: matchingStatus,
  };
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
    promises: ({ limit }) => {
      const promises = client.getPromises({ limit });
      return handlePromises(defaultStatus, promiseStatuses, promises);
    },
    // keyPromises: ({ limit }) => {
    //   const keyPromises = client.query({ query: "GET_KEY_PROMISES", limit });
    //   return handlePromises(defaultStatus, promiseStatuses, keyPromises);
    // },
    // promisesByCategories: (category) => {
    //   return client.query({ query: "GET_PROMISES_BY_CATEGORY", category });
    // },
    // projectMeta: () => {
    //   return {
    //     tags: client.getTags(),
    //   };
    // },
    // promise: ({ id }) => {
    //   const promise = client.query({ query: "GET_PROMISE", id });
    //   return handleSinglePromise(defaultStatus, promiseStatuses, promise);
    // },
  };
  return api;
};

export default promiseSource;
