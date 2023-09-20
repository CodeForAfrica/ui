import getInvolved from "./get-involved";
import hero from "./hero";
import ourImpact from "./our-impact";

const propsifyBlockBySlug = {
  hero,
  "our-impact": ourImpact,
  "get-involved": getInvolved,
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
