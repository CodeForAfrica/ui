import featuredStories from "./featuredStories";
import posts from "./posts";

const propsifyBlockBySlug = {
  "featured-stories": featuredStories,
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
