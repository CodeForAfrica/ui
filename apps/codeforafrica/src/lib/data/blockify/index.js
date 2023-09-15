import hero from "./hero";
import joinOurSlack from "./joinOurSlack";

const propsifyBlockBySlug = {
  hero,
  "join-our-slack": joinOurSlack,
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
