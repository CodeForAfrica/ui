import { equalsIgnoreCase, slugify } from "@/promisetracker/utils";

function jsonQL(promises) {
  const allPromises = promises.map((promise) => {
    const slug = promise.slug || slugify(promise.title);
    const href = promise.href || `/promises/${promise.id}/${slug}`;

    return { ...promise, href, slug };
  });
  const categories = Array.from(
    allPromises
      .reduce((acc, curr) => {
        curr.categories.reduce((currAcc, c) => {
          const slug = c.slug || slugify(c.name);
          currAcc.set(slug, { ...c, slug });
          return currAcc;
        }, acc);
        return acc;
      }, new Map())
      .values()
  );
  const statuses = Array.from(
    allPromises
      .reduce((acc, curr) => {
        const { status } = curr;
        const slug = status.slug || slugify(status.name);
        acc.set(slug, { ...curr, slug });
        return acc;
      }, new Map())
      .values()
  );

  const api = {
    getCategories() {
      return categories;
    },
    getPromises({ limit, category, isKey, status } = {}) {
      const hasCategory = (p) =>
        !category ||
        p.categories.some((c) => equalsIgnoreCase(c.name, category));
      const isKeyPromise = (p) => !isKey || p.isKey;
      const hasStatus = (p) =>
        !status || equalsIgnoreCase(p.status.name, status);
      const filteredPromises = allPromises.filter(
        (p) => hasCategory(p) && isKeyPromise(p) && hasStatus(p)
      );
      return filteredPromises.slice(0, limit);
    },
    getPromise({ id, ...others } = {}) {
      const filteredPromises = api.getPromises(others);
      if (id) {
        return filteredPromises.find((p) => equalsIgnoreCase(p.id, id));
      }
      const [promise] = filteredPromises;
      return promise;
    },
    getStatuses() {
      return statuses;
    },
  };

  return api;
}

export default jsonQL;
