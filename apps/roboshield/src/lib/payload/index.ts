import payload from "payload";
import { ByIDOptions } from "payload/dist/collections/operations/local/update";

async function findPage(slug: string, options: ByIDOptions<string>) {
  return payload.find({
    ...options,
    collection: "pages",
    where: {
      ...(options?.where || {}),
      slug: {
        equals: slug,
      },
    },
  });
}

async function getCollection(
  collection: string,
  options: Partial<ByIDOptions<string>>,
) {
  return payload.find({
    limit: 0,
    ...options,
    collection,
  });
}

async function findGlobal(slug: string, options: ByIDOptions<string>) {
  return payload.findGlobal({
    ...options,
    slug,
  });
}

async function createCollection(
  collection: string,
  data: any,
  options: Partial<ByIDOptions<string>>,
) {
  return payload.create({
    collection,
    data,
    ...options,
  });
}

async function deleteCollection(
  collection: string,
  options: ByIDOptions<string>,
) {
  return payload.delete({
    ...options,
    collection,
  });
}

async function updateCollection(
  collection: string,
  id: string,
  data: any,
  options: ByIDOptions<string>,
) {
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
