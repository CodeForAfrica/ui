export default async function handler(req, res) {
  const { secret } = req.query;
  if (secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: "Invalid token" });
  }
  const { path } = req.body;
  if (!path) {
    return res.status(400).json({ message: "Path is required" });
  }
  try {
    await res.revalidate(path);
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).json({ message: "Error revalidating", error: err });
  }
}
