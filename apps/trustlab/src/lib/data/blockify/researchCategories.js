import { formatPagePath } from "@commons-ui/payload";

async function researchCategoryList(block, _, context) {
  const {
    blockType: slug,
    categories: originalCategories,
    readMoreLabel = "Read More",
  } = block;
  const categories = originalCategories.map((category) => {
    if (category.report) {
      const parentPage = context?.params?.slugs?.[0] || "research";
      const link = formatPagePath(parentPage, category.report);
      return {
        ...category,
        link: {
          href: link
            ? `${link}/${category.report.slug}`
            : `/${category.report.slug}`,
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
