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
    query({ query, limit, category, slug }) {
      switch (query) {
        case "GET_PROMISES":
          return allPromises.slice(0, limit);
        case "GET_PROMISE":
          try {
            const promise = allPromises.filter((p) => `${p.slug}` === slug)[0];
            return promise;
          } catch (e) {
            return [];
          }
        case "GET_KEY_PROMISES": {
          const keyPromises =
            promises?.promises?.filter((p) => p.keyPromise) ?? [];
          return keyPromises.slice(0, limit);
        }
        case "GET_PROMISES_BY_CATEGORY": {
          const promisesByCat = promises.promises.filter(
            (p) =>
              p.category.toLocaleLowerCase() === category.toLocaleLowerCase()
          );
          return promisesByCat;
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
