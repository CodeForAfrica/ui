import explorePage from "./explore-page";
import pageHero from "./page-hero";
import team from "./team";
import tutorial from "./tutorial";

const propsifyBlockBySlug = {
  "explore-page": explorePage,
  "page-hero": pageHero,
  team,
  tutorial,
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
