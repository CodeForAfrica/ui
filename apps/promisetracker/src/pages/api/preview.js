import wp from "@/promisetracker/lib/wp";

export default async function preview(req, res) {
  const {
    postType,
    postId,
    revisionId,
    _wpnonce: nonce,
    _thumbnail_id: thumbnailId,
  } = req.query;
  // Fetch WordPress to check if the provided `id` or `slug` exists
  const wpApi = wp();
  let post;
  if (postType === "pages") {
    post = await wpApi.revisions({ id: postId, nonce, revisionId, thumbnailId })
      .page;
  } else if (postType === "posts") {
    post = await wpApi.revisions({ id: postId, nonce, revisionId, thumbnailId })
      .post;
  }
  // If the post doesn't exist prevent preview mode from being enabled
  if (!post) {
    return res.status(404).redirect(`/not-found`);
  }
  res.setPreviewData({
    query: { id: postId, nonce, revisionId, thumbnailId },
  });

  if (postType === "pages") {
    res.redirect(`/about/${post.slug}`);
  } else {
    res.redirect(`/analysis/articles/${post.slug}`);
  }
  res.end();
  return post;
}
