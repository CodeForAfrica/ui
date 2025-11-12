async function researchCategoryList(block) {
  const {
    blockType: slug,
    categories: originalCategories,
    readMoreLabel = "Read More",
  } = block;
  const categories = originalCategories.map((category) => {
    if (category.report) {
      return {
        ...category,
        link: {
          href: `/research/${category.report.slug}`,
          label: readMoreLabel,
        },
      };
    }
    return category;
  });
  return {
    ...block,
    slug,
    categories,
  };
}
export default researchCategoryList;
