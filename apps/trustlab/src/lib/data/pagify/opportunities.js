import blockify from "@/trustlab/lib/data/blockify";

function pagifyOpportunities(collection) {
  return async function pagifyOpportunity(api, context, parentPage) {
    const { params, locale } = context;
    const { slugs } = params;
    if (!slugs || slugs.length < 2) {
      return null;
    }

    const slug = slugs[slugs.length - 1];
    const { docs } = await api.getCollection(collection, {
      where: {
        slug: { equals: slug },
      },
      locale,
      depth: 2,
    });
    if (!docs?.length) {
      return null;
    }

    const doc = docs[0];
    const contentBlocks = doc.blocks || [];
    const processedBlocks = await blockify(contentBlocks, api, { locale });
    const blocks = processedBlocks.filter(Boolean);
    return { ...doc, blocks, parent: parentPage };
  };
}

export default {
  opportunity: pagifyOpportunities("opportunities"),
  organisations: pagifyOpportunities("organisations"),
};
