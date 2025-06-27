import collectionOverview from "./collectionOverview";
import postList from "./postList";

const propsifyBlockBySlug = {
  "helplines-overview-list": collectionOverview,
  "resources-overview-list": collectionOverview,
  "post-list": postList,
  spotlight: collectionOverview,
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
