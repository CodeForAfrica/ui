import formatPagePath from "@/commons-ui/payload/utils/formatPagePath";

const collection = "pages";

async function findAndFormatPagePath(payload, page) {
  let docs;
  if (typeof page === "string") {
    const options = {
      collection,
      where: {
        slug: {
          equals: page,
        },
      },
      limit: 1,
    };
    ({ docs } = await payload.find(options));
  } else if (typeof page === "object") {
    // Assume page is doc/object already
    docs = [page];
  }
  if (docs?.length) {
    return formatPagePath(collection, docs[0]);
  }
  return undefined;
}

export default findAndFormatPagePath;
