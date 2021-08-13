import promises from "../../../public/promises.json";

const JsonSourceClient = () => {
  return {
    query({ query, limit, category, id }) {
      switch (query) {
        case "GET_PROMISES":
          return new Promise((resolve) => {
            resolve(promises.promises.slice(0, limit));
          });
        case "GET_PROMISE":
          return new Promise((resolve) => {
            try {
              const promise = promises.promises.filter(
                (p) => `${p.id}` === id
              )[0];
              return resolve(promise);
            } catch (e) {
              return resolve([]);
            }
          });
        case "GET_KEY_PROMISES":
          return new Promise((resolve) => {
            const keyPromises =
              promises?.promises?.filter(
                (p) => `${p.key_promise}` === "True"
              ) ?? [];
            resolve(keyPromises.slice(0, limit));
          });
        case "GET_PROMISES_BY_CATEGORY":
          return new Promise((resolve) => {
            const promisesByCat = promises.promises.filter(
              (p) => p.category === category
            );
            resolve(promisesByCat);
          });
        default:
          return new Promise();
      }
    },
    getTags() {
      let tt = [];
      promises.promises.map((p) => {
        p.tags.forEach((t) => {
          tt = tt.concat({ slug: t, name: t });
        });
        return tt;
      });
      return tt;
    },
  };
};

export default JsonSourceClient;
