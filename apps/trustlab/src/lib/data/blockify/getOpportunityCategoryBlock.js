async function getOpportunityCategoryBlock(block) {
  const { categories, settings, ...rest } = block;

  const resolvedCategories = await Promise.all(
    (categories || []).map(async (category) => {
      const image = category.image ?? null;
      const link = category.link ?? null;

      return {
        ...category,
        image,
        link,
      };
    }),
  );

  return {
    ...rest,
    slug: "opportunity-category",
    categories: resolvedCategories,
    settings,
  };
}

export default getOpportunityCategoryBlock;
