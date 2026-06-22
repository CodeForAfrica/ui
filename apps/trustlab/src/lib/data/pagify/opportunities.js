import formatDate from "@/trustlab/payload/utils/formatDate";

const overviewBlockTypes = ["content-overview", "opportunity-overview"];

function pagifyOpportunities(collection) {
  return async function pagifyOpportunityCollection(api, context, parentPage) {
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
    const date = formatDate(doc.date);
    const contentBlocks = doc.blocks || [];
    // blockify is called after pagefy so *MUST* not call it here
    const blocks = contentBlocks.filter(Boolean).map((block) => {
      if (overviewBlockTypes.includes(block.blockType)) {
        return {
          ...block,
          date,
          location: doc.location ?? null,
          title: block.title || "Overview",
        };
      }
      return block;
    });
    return { ...doc, blocks, date, parent: parentPage };
  };
}

export default {
  opportunity: pagifyOpportunities("opportunities"),
  organisations: pagifyOpportunities("organisations"),
};
