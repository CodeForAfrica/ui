import { getPosts } from "@/trustlab/utils/post";

async function postList(block, api, context) {
  const {
    blockType,
    closedLabel,
    dateLabel = null,
    linkLabel,
    title = null,
    showAllPosts = true,
    posts: initialPosts = [],
    publishedLabel = null,
  } = block;
  const { params } = context;
  const { slugs } = params;
  const [page] = slugs;

  let posts = initialPosts;
  let pagination = {
    count: initialPosts.length,
    page: 1,
  };

  if (showAllPosts) {
    const postData = await getPosts(api, page, {
      limit: 9,
    });
    pagination = postData.pagination;
    posts = postData.posts;
  }
  return {
    blockType,
    slug: blockType,
    posts,
    closedLabel,
    dateLabel,
    linkLabel,
    publishedLabel,
    pagination,
    title,
    showAllPosts,
  };
}

export default postList;
