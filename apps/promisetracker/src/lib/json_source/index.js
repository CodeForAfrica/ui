import JsonSourceClient from "./json_source_client";

const client = JsonSourceClient();

const promiseSource = () => {
  const api = {
    promises: async () => {
      return client.query("GET_PROMISES").then((response) => {
        return response;
      });
    },
    projectMeta: async () => {
      return { tags: ["crime", "war"] };
    },
  };
  return api;
};

export default promiseSource;
