import featuredStories from "./featuredStories";
import featuredWork from "./featuredWork";
import getInvolved from "./get-involved";
import hero from "./hero";
import meetOurTeam from "./meetOurTeam";
import ourImpact from "./our-impact";
import ourOffices from "./ourOffices";
import ourTeam from "./ourTeam";
import ourWork from "./ourWork";
import posts from "./posts";

const propsifyBlockBySlug = {
  "featured-work": featuredWork,
  "featured-stories": featuredStories,
  "get-involved": getInvolved,
  hero,
  "meet-our-team": meetOurTeam,
  "our-impact": ourImpact,
  "our-team": ourTeam,
  "our-work": ourWork,
  "our-offices": ourOffices,
  // post-list to avoid conflict with posts collection in payload
  "post-list": posts,
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
