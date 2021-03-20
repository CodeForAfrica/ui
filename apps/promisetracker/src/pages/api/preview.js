export default async function preview(req, res) {
  const {
    postType,
    postId,
    revisionId,
    _thumbnail_id: thumbnailId,
    token,
  } = req.query;

  res.setPreviewData({
    query: { id: postId, revisionId, thumbnailId, token },
  });

  if (postType === "pages") {
    res.redirect(`/about/${postId}`);
  } else {
    res.redirect(`/analysis/articles/${postId}`);
  }
  res.end();
}
