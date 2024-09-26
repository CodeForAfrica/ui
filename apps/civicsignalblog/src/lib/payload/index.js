import payload from "payload";

import { RESEARCH } from "../../payload/lib/data/common/applications";

async function findPage(slug, options) {
  return payload.find({
    ...options,
    collection: `${RESEARCH}-pages`,
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

async function findGlobal(slug, options) {
  return payload.findGlobal({
    ...options,
    slug: `settings-${RESEARCH}-site`,
  });
}

async function createCollection(collection, data, options) {
  return payload.create({
    collection,
    data,
    ...options,
  });
}

async function deleteCollection(collection, options) {
  return payload.delete({
    ...options,
    collection,
  });
}

async function updateCollection(collection, id, data, options) {
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
