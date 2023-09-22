import getInvolved from "./get-involved";
import hero from "./hero";
import meetOurTeam from "./meetOurTeam";
import ourImpact from "./our-impact";
import stories from "./stories";

const propsifyBlockBySlug = {
  "get-involved": getInvolved,
  hero,
  "meet-our-team": meetOurTeam,
  "our-impact": ourImpact,
  stories,
};

async function blockify(blocks, api) {
  const promises = blocks?.map(async (block) => {
    const slug = block.blockType;
    const propsifyBlock = propsifyBlockBySlug[slug];

    if (propsifyBlock) {
      return propsifyBlock(block, api);
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
