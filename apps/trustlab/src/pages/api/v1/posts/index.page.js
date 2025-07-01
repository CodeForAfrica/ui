import api from "@/trustlab/lib/payload";
import { getPosts } from "@/trustlab/utils/post";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { page, path } = req.query;
  if (!page || typeof parseInt(page, 10) !== "number") {
    return res.status(400).json({ error: "Invalid page number" });
  }
  if (!path || typeof path !== "string") {
    return res.status(400).json({ error: "Invalid path" });
  }

  const posts = await getPosts(api, path, {
    page: Number(page),
    limit: 9,
  });

  return res.status(200).json({ ...posts });
}
