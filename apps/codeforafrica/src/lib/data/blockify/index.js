import getInvolved from "./get-involved";
import hero from "./hero";
import meetOurTeam from "./meetOurTeam";
import ourImpact from "./our-impact";
import ourTeam from "./ourTeam";
import ourWork from "./ourWork";
import posts from "./posts";
import postsOverview from "./posts-overview";

const propsifyBlockBySlug = {
  "get-involved": getInvolved,
  hero,
  "meet-our-team": meetOurTeam,
  "our-impact": ourImpact,
  "our-team": ourTeam,
  "our-work": ourWork,
  // post-list to avoid conflict with posts collection in payload
  "post-list": posts,
  "posts-overview": postsOverview,
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
  return blocks ?? null;
}

export default blockify;
