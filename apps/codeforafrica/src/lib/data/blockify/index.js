import hero from "./hero";

const blockifyBySlug = {
  hero,
};

async function blockify(blocks) {
  const promises = blocks.map(async (block) => {
    const slug = block.blockType;
    const blockifyFunction = blockifyBySlug[slug];
    if (blockifyFunction) {
      const processedBlock = await blockifyFunction(block);
      return processedBlock;
    }
    return block;
  });
  return Promise.all(promises);
}

export default blockify;
