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

const api = {
  findPage,
};

export default api;
