import { getPosts } from "@/codeforafrica/lib/data/utils/posts";
import api from "@/codeforafrica/lib/payload";

export default async function handler(req, res) {
  const { path, ...other } = req.query;
  if (!path) return res.status(500).json({ error: "path is required" });
  try {
    const data = await getPosts(api, other, path);
    return res.json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
}
