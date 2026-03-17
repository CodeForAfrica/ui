import blockify from "@/trustlab/lib/data/blockify";

async function opportunity(api, context) {
  const { params, locale } = context;
  const { slugs } = params;

  if (!slugs || slugs.length < 2) {
    return null;
  }

  const opportunitySlug = slugs[slugs.length - 1];
  const result = await api.getCollection("opportunities", {
    where: {
      slug: { equals: opportunitySlug },
    },
    locale,
    depth: 2,
  });

  const doc = result.docs?.[0];

  if (!doc) {
    return null;
  }

  const contentBlocks = doc.blocks || [];
  const processedBlocks = await blockify(contentBlocks, api, { locale });

  const blocks = processedBlocks.filter(Boolean);

  return {
    id: doc.id,
    slug: doc.slug,
    title: doc.title,
    type: doc.type,
    blocks,
  };
}

export default opportunity;
