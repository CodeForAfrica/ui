import blockify from "@/codeforafrica/lib/payload/common/blockify";
import getNavigation from "@/codeforafrica/lib/payload/common/navigation";

export default async function getPageProps(api, pageSlug) {
  const slug = pageSlug === "/" ? "index" : pageSlug;

  const { docs: pages } = await api.findPage(slug);

  if (!pages?.length) {
    return null;
  }
  const [page] = pages;
  const pageBlocks = await blockify(page.blocks);

  const navigation = await getNavigation(api);
  return {
    navbar: navigation,
    sections: [
      pageBlocks.map((block) => {
        return { ...block };
      }),
    ],
  };
}
