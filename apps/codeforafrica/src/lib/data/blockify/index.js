import getInvolved from "./get-involved";
import hero from "./hero";
import meetOurTeam from "./meetOurTeam";
import ourImpact from "./our-impact";
import ourTeam from "./ourTeam";
import ourWork from "./ourWork";

const propsifyBlockBySlug = {
  hero,
  "meet-our-team": meetOurTeam,
  "our-impact": ourImpact,
  "get-involved": getInvolved,
  "our-team": ourTeam,
  "our-work": ourWork,
};

async function blockify(blocks, api, context) {
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
  return blocks;
}

export default blockify;
