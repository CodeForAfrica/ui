import payload from "payload";

async function findPage(slug, options) {
  return payload.find({
    ...options,
    collection: "pages",
    where: {
      ...options?.where,
      slug: {
        equals: slug,
      },
    },
  });
}

async function getCollection(collection, options) {
  return payload.find({
    limit: 0,
    ...options,
    collection,
  });
}

async function createCollection(collection, data, options) {
  return payload.create({
    collection,
    data,
    ...options,
  });
}

async function findGlobal(slug, options) {
  return payload.findGlobal({
    ...options,
    slug,
  });
}

async function updateCollection(collection, id, data, options) {
  const { id: _, ...rest } = data;
  return payload.update({
    collection,
    id,
    data: rest,
    ...options,
  });
}

const api = {
  createCollection,
  findGlobal,
  findPage,
  getCollection,
  updateCollection,
};

export default api;
