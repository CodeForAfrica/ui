import { formatPost } from "@/codeforafrica/lib/data/utils/posts";

async function postsOverview(block) {
  const { featured, posts, primaryTag, ...other } = block;
  return {
    ...other,
    featured: formatPost(featured, primaryTag),
    posts: posts.map((post) => formatPost(post, primaryTag)),
    slug: "posts-overview",
  };
}

export default postsOverview;
