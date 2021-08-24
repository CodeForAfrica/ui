import check from "@/promisetracker/lib/check";
import JsonpromiseSource from "@/promisetracker/lib/jsonSource";

const Api = ({ promiseStatuses, team }) => {
  const promisesApi = {
    Json: JsonpromiseSource({ promiseStatuses }),
    Check: check({
      promiseStatuses,
      team,
    }),
  };
  const sourceLib = process.env.SOURCE_LIB || "Check";
  return promisesApi[sourceLib];
};

export default Api;
