import config from "@payload-config";
import { getPayload } from "payload";

import { publishedOnly } from "./publishedOnly";

const payload = await getPayload({ config });

async function find(collection, options) {
  return payload.find({
    ...options,
    collection,
    where: publishedOnly(options?.where, {
      draft: options?.draft,
      drafts: payload.collections[collection]?.config?.versions?.drafts,
    }),
  });
}

async function findPage(slug, options) {
  return find("pages", {
    ...options,
    where: {
      ...options?.where,
      slug: {
        equals: slug,
      },
    },
  });
}

async function getCollection(collection, options) {
  return find(collection, {
    limit: 0,
    ...options,
  });
}

async function findGlobal(slug, options) {
  return payload.findGlobal({
    ...options,
    slug,
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
