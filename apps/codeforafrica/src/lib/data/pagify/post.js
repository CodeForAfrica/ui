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
  const block = parentPage.blocks.find(
    ({ blockType }) => blockType === "post-list",
  );
  const {
    labels: { recentStories },
  } = block;

  const individualPost = await getPost(api, slug, page);
  const { meta, blocks, title } = individualPost;
  return {
    title,
    meta,
    blocks: [
      ...blocks,
      {
        blockType: "recent-stories",
        title: recentStories,
        stories: recentPost,
      },
    ],
  };
}

export default post;
