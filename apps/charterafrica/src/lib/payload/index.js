import payload from "payload";

async function findPage(slug, options) {
  return payload.find({
    ...options,
    collection: "boom",
    where: {
      slug: {
        equals: slug,
      },
    },
  });
}

async function findGlobal(slug, options) {
  return payload.findGlobal({
    ...options,
    slug,
  });
}
async function findCollection(collection, options) {
  return payload.find({
    ...options,
    collection,
  });
}

const api = {
  findCollection,
  findGlobal,
  findPage,
};

export default api;
