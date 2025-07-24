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

  // afterRead hook doesn't run in the relationship field for selected posts of a block. We are adding this to query the posts by ids so we can have links populated.
  const options = showAllPosts
    ? {
        limit: 9,
      }
    : {
        where: {
          id: {
            in: initialPosts.map((post) => post.id).join(","),
          },
        },
      };
  const { pagination, posts } = await getPosts(api, page, options);

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
