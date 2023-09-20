import hero from "./hero";
import meetOurTeam from "./meetOurTeam";
import ourImpact from "./our-impact";

const propsifyBlockBySlug = {
  hero,
  "meet-our-team": meetOurTeam,
  "our-impact": ourImpact,
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
