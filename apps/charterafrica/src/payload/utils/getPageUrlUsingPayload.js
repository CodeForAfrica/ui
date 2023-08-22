import { fullSlugFromParents } from "./formatPagePath";

const getPageUrlUsingPayload = async (payload, slug) => {
  const collection = "pages";
  const options = {
    where: {
      slug: {
        equals: slug,
      },
    },
  };

  const { docs } = await payload.find({
    limit: 0,
    ...options,
    collection,
  });

  return fullSlugFromParents(docs[0]);
};

export default getPageUrlUsingPayload;
