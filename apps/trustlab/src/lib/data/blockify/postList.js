import { getPosts } from "@/trustlab/utils/post";

async function postList(block, api, context) {
  const {
    blockType,
    closedLabel,
    dateLabel = null,
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
    dateLabel,
    linkLabel,
    publishedLabel,
    pagination,
  };
}

export default postList;
