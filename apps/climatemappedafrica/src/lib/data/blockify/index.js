import explorePage from "./explore-page";
import hero from "./hero";
import pageHero from "./page-hero";
import team from "./team";
import tutorial from "./tutorial";

const propsifyBlockBySlug = {
  "explore-page": explorePage,
  hero,
  "page-hero": pageHero,
  team,
  tutorial,
};

export const blockify = async ({ blocks }, api, context, settings) => {
  const promises = blocks?.map(async (block) => {
    const slug = block.blockType;
    const propsifyBlock = propsifyBlockBySlug[slug];

    if (propsifyBlock) {
      return propsifyBlock(block, api, context, settings);
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
