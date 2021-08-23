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
      allPromises.map((p) => {
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
