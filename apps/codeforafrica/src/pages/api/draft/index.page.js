export default async function handler(req, res) {
  const { slug } = req.query;
  res.setDraftMode({ enable: true });
  res.redirect(slug);
  return null;
}
