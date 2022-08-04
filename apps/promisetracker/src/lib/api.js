import JsonpromiseSource from "@/promisetracker/lib/jsonSource";

const Api = ({ promiseStatuses }) => {
  const promisesApi = {
    JSON: JsonpromiseSource({ promiseStatuses }),
  };
  const sourceLib = process.env.SOURCE_LIB?.toUpperCase() || "JSON";
  return promisesApi[sourceLib];
};

export default Api;
