import config from "@payload-config";
import { getPayload } from "payload";

const payload = await getPayload({ config });

// Public reads respect collection access so that anonymous visitors only get
// published pages and posts, including those reached through relationships.
// Draft reads (`draft: true`) come only from the authenticated preview and
// keep the local API's default of overriding access.
async function find(collection, options) {
  return payload.find({
    overrideAccess: Boolean(options?.draft),
    ...options,
    collection,
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

// Same as `find`, e.g. navigation links in the site settings to unpublished
// pages.
async function findGlobal(slug, options) {
  return payload.findGlobal({
    overrideAccess: Boolean(options?.draft),
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
