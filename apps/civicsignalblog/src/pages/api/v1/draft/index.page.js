export default async function handler(req, res) {
  // Since payload and Next.js are running on the same server process, lets
  // make sure the user requesting to preview, is logged into Payload
  // See "Tip" on: https://payloadcms.com/docs/authentication/overview#token-based-auth
  if (!req.user) {
    return res.status(401).json({ message: "UNAUTHORIZED_USER" });
  }
  const { slug } = req.query;
  res.setDraftMode({ enable: true });

  // Guard against open redirect vulnerabilities
  // Since slug will be a path, redirect to pathname instead of original slug
  // just in case
  const appUrl = new URL(process.env.NEXT_PUBLIC_APP_URL);
  const requestedUrl = new URL(slug, appUrl);
  if (requestedUrl.origin !== appUrl.origin) {
    return res.status(401).json({ message: "UNAUTHORIZED_REDIRECT" });
  }
  return res.redirect(requestedUrl.pathname);
}
