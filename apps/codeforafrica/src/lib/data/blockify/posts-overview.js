import { formatPost } from "@/codeforafrica/lib/data/utils/posts";

async function postsOverview(block) {
  const { featured, posts, ...other } = block;
  return {
    ...other,
    featured: formatPost(featured, "stories"),
    posts: posts.map((post) => formatPost(post, "stories")),
    slug: "posts-overview",
  };
}

export default postsOverview;
