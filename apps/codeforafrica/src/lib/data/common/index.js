import blockify from "@/codeforafrica/lib/data/blockify";
import getNavigation from "@/codeforafrica/lib/data/common/navigation";

export async function getPageProps(api, slug) {
  const {
    docs: [page],
  } = await api.findPage(slug);
  const { blocks = [] } = page;
  const processedBlocks = await blockify(blocks);
  const navigation = await getNavigation(api);
  return {
    navbar: navigation,
    blocks: processedBlocks,
  };
}

export default getPageProps;
