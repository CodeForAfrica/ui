import hero from "./hero";
import teamInfographic from "./teamInfographic";

const propsifyBlockBySlug = {
  hero,
  "team-infographic": teamInfographic,
};

async function blockify(blocks) {
  const promises = blocks?.map(async (block) => {
    const slug = block.blockType;
    const propsifyBlock = propsifyBlockBySlug[slug];

    if (propsifyBlock) {
      return propsifyBlock(block);
    }
    return {
      ...block,
      slug,
    };
  });

  if (promises) {
    return Promise.all(promises);
  }
  return blocks;
}

export default blockify;
