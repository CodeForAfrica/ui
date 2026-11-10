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

  // Selected posts reached through the relationship don't get their parent
  // page (`maxDepth: 1`), so the afterRead hook can't build their links. We
  // query the posts by ids so that the links are populated.
  const options = showAllPosts
    ? {
        limit: 9,
      }
    : {
        where: {
          id: {
            // Posts the visitor can't read (e.g. unpublished) are IDs, not
            // documents; getPosts leaves them out
            in: initialPosts.map((post) => post?.id ?? post).join(","),
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
