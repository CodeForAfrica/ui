import promises from "../../../public/promises.json";

const JsonSourceClient = () => {
  return {
    query({ query, limit, category, id }) {
      switch (query) {
        case "GET_PROMISES":
          return promises.promises.slice(0, limit);
        case "GET_PROMISE":
          try {
            const promise = promises.promises.filter(
              (p) => `${p.id}` === id
            )[0];
            return promise;
          } catch (e) {
            return [];
          }
        case "GET_KEY_PROMISES": {
          const keyPromises =
            promises?.promises?.filter((p) => `${p.key_promise}` === "True") ??
            [];
          return keyPromises.slice(0, limit);
        }
        case "GET_PROMISES_BY_CATEGORY": {
          const promisesByCat = promises.promises.filter(
            (p) => p.category === category
          );
          return promisesByCat;
        }
        default:
          return new Promise();
      }
    },
    getTags() {
      const tt = [];
      promises.promises.map((p) => {
        p.tags.forEach((t) => {
          if (!tt.find((tag) => Object.values(tag).includes(t))) {
            tt.push({ slug: t, name: t });
          }
        });
        return tt;
      });
      return tt;
    },
  };
};

export default JsonSourceClient;
