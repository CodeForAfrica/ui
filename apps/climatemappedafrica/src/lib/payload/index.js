import { getClient } from "./payload-client";

async function findPage(slug, options) {
  const payload = await getClient();
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
  const payload = await getClient();
  return payload.find({
    limit: 0,
    ...options,
    collection,
  });
}

async function findGlobal(slug, options) {
  const payload = await getClient();
  return payload.findGlobal({
    ...options,
    slug,
  });
}

async function createCollection(collection, data, options) {
  const payload = await getClient();
  return payload.create({
    collection,
    data,
    ...options,
  });
}

async function deleteCollection(collection, options) {
  const payload = await getClient();
  return payload.delete({
    ...options,
    collection,
  });
}

async function updateCollection(collection, id, data, options) {
  const payload = await getClient();
  const args = {
    ...options,
    collection,
    id,
    data,
  };
  return payload.update(args);
}
const api = {
  createCollection,
  deleteCollection,
  findGlobal,
  findPage,
  getCollection,
  updateCollection,
};

export default api;
