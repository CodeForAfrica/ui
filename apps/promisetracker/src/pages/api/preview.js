import wp from "@/promisetracker/lib/wp";

export default async function preview(req, res) {
  const { slug } = req.query;
  // Fetch WordPress to check if the provided `id` or `slug` exists
  const wpApi = wp();
  const post = await wpApi.posts({ slug }).first;

  // If the post doesn't exist prevent preview mode from being enabled
  if (!post) {
    return res.status(401).json({ message: "Post not found" });
  }
  res.setPreviewData({
    post: {
      slug: post.slug,
    },
  });

  // Redirect to the path from the fetched post
  res.redirect(`/analysis/articles/${post.slug}`);
  res.end();

  return post;
}
