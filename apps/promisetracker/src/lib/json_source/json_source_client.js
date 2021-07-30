import promises from "./promises.json";

const JsonSourceClient = () => {
  return {
    query(query) {
      switch (query) {
        case "GET_PROMISES":
          return new Promise((resolve, reject) => {
            if (promises.promises === undefined) {
              reject(new Error("No promises defined"));
            }
            resolve(promises.promises);
          });
        default:
          return new Promise();
      }
    },
  };
};

export default JsonSourceClient;
