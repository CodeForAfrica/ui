import promises from "../../../public/promises.json";

import { slugify } from "@/promisetracker/utils";

const JsonSourceClient = () => {
  // Sulugify all promises
  let allPromises = promises.promises;

  allPromises = allPromises.map((promise) => {
    const slug = slugify(promise.title);
    return {
      ...promise,
      href: `/promises/${promise.id}/${slug}`,
      slug,
    };
  });

  return {
    query({ query, limit, category, id }) {
      switch (query) {
        case "GET_PROMISES":
          return allPromises.slice(0, limit);
        case "GET_PROMISE":
          try {
            const promise = allPromises.filter((p) => `${p.id}` === id)[0];
            return promise;
          } catch (e) {
            return [];
          }
        case "GET_KEY_PROMISES": {
          const keyPromises = allPromises.filter((p) => p.keyPromise) ?? [];
          return keyPromises.slice(0, limit);
        }
        case "GET_PROMISES_BY_CATEGORY": {
          return allPromises.filter(
            (p) =>
              p.category.toLocaleLowerCase() === category.toLocaleLowerCase()
          );
        }
        default:
          return [];
      }
    },
    getTags() {
      return allPromises.reduce((acc, curr) => {
        curr.tags.forEach((tag) => {
          if (!acc.find((tagObj) => tagObj.slug === tag)) {
            acc.push({
              slug: tag,
              name: tag,
            });
          }
        });
        return acc;
      }, []);
    },
  };
};

export default JsonSourceClient;
