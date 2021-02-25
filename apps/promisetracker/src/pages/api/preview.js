import wp from "@/promisetracker/lib/wp";

export default async function preview(req, res) {
  const { slug } = req.query;

  // Fetch WordPress to check if the provided `id` or `slug` exists
  const wpApi = wp();
  const post = await wpApi.posts({ slug }).posts;

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
  // We don't redirect to `req.query.slug` as that might lead to open redirect vulnerabilities
  res.writeHead(307, { Location: `posts/${post.slug}` });
  res.end();

  return post;
}
