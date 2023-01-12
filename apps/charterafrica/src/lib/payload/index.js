import payload from "payload";

async function findPage(slug, collection, options) {
  return payload.find({
    ...options,
    collection,
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

const api = {
  findGlobal,
  findPage,
};

export default api;
