import hero from "./hero";
import pageHero from "./page-hero";
import team from "./team";

const propsifyBlockBySlug = {
  hero,
  "page-hero": pageHero,
  team,
};

export const blockify = async (blocks, api, context) => {
  const promises = blocks?.map(async (block) => {
    const slug = block.blockType;
    const propsifyBlock = propsifyBlockBySlug[slug];

    if (propsifyBlock) {
      return propsifyBlock(block, api, context);
    }
    return {
      ...block,
      slug,
    };
  });

  if (promises) {
    return Promise.all(promises);
  }
  return blocks ?? null;
};

export default undefined;
