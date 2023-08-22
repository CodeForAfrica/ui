import { fullSlugFromParents } from "./formatPagePath";

const getPageUrlUsingPayload = async (payload, slug) => {
  const options = {
    collection: "pages",
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 0,
  };

  const { docs } = await payload.find(options);

  return fullSlugFromParents(docs[0]);
};

export default getPageUrlUsingPayload;
