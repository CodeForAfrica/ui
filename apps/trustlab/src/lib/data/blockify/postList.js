import { getPosts } from "@/trustlab/utils/post";

async function postList(block, api, context) {
  const {
    blockType,
    closedLabel,
    deadlineLabel,
    linkLabel,
    publishedLabel = null,
  } = block;
  const { params } = context;
  const { slugs } = params;
  const [page] = slugs;

  const { posts = [], pagination } = await getPosts(api, page, {
    limit: 9,
  });

  return {
    blockType,
    slug: blockType,
    posts,
    closedLabel,
    deadlineLabel,
    linkLabel,
    publishedLabel,
    pagination,
  };
}

export default postList;
