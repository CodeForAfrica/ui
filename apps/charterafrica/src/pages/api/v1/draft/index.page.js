export default async function handler(req, res) {
  // Since payload and Next.js are running on the same server process, lets
  // make sure the user requesting to preview, is logged into Payload
  // See "Tip" on: https://payloadcms.com/docs/authentication/overview#token-based-auth
  if (!req.user) {
    return res.status(500).json({ message: "UNAUTHORIZED_USER" });
  }
  const { slug } = req.query;
  res.setDraftMode({ enable: true });

  return res.redirect(slug);
}