import { getPosts } from "@/codeforafrica/lib/data/utils/posts";

async function relatedPosts(block, api) {
  const { primaryTag, number, ...other } = block;

  const options = {
    limit: number,
  };
  const { posts } = await getPosts(api, options, primaryTag);
  return {
    ...other,
    posts,
    slug: "related-posts",
  };
}

export default relatedPosts;
