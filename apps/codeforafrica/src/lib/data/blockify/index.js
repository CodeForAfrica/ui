import hero from "./hero";

const propsifyBlockBySlug = {
  hero,
};

async function blockify(blocks) {
  const promises = blocks?.map(async (block) => {
    const slug = block.blockType ?? block.slug ?? null;
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
