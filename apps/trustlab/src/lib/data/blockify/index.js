import collectionOverview from "./collectionOverview";
import postList from "./postList";
import reportsList from "./reportsList";
import spotlightOverview from "./spotlightOverview";

const propsifyBlockBySlug = {
  "helplines-overview-list": collectionOverview,
  "resources-overview-list": collectionOverview,
  "post-list": postList,
  spotlight: spotlightOverview,
  "reports-list": reportsList,
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
