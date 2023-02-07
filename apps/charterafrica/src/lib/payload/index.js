import payload from "payload";

async function findPage(slug, options) {
  return payload.find({
    ...options,
    collection: "pages",
    where: {
      slug: {
        equals: slug,
      },
    },
  });
}

async function getCollection(collection, options) {
  return payload.find({
    collection,
    where: {},
    ...options,
  });
}

async function findGlobal(slug, options) {
  return payload.findGlobal({
    ...options,
    slug,
  });
}

const api = {
  findGlobal,
  findPage,
  getCollection,
};

export default api;
