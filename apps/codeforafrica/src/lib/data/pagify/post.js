import { getPost, getPosts } from "@/codeforafrica/lib/data/utils/posts";

async function post(api, context, parentPage) {
  const { params } = context;
  const page = params.slugs[1];
  const slug = params.slugs[2];

  const { posts: recentPost } = await getPosts(
    api,
    {
      limit: 3,
      sort: "publishedOn",
    },
    "stories",
  );
  const individualPost = await getPost(api, slug, page);
  const { blocks, ...other } = individualPost;
  const block = parentPage.blocks.find(
    ({ blockType }) => blockType === "post-list",
  );
  const recentStories = page === "stories" && {
    blockType: "recent-stories",
    title: block?.labels?.recentStories || "",
    stories: recentPost,
  };
  if (recentStories) {
    blocks.push(recentStories);
  }
  return {
    ...other,
    blocks,
  };
}

export default post;
