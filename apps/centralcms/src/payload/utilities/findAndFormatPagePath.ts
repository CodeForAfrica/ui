import formatPagePath from "./formatPagePath";

async function findAndFormatPagePath(payload, slug) {
  const collection = "pages";
  const options = {
    collection,
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 0,
  };
  const { docs } = await payload.find(options);

  if (docs?.length) {
    return formatPagePath(collection, docs[0]);
  }
  return undefined;
}

export default findAndFormatPagePath;
