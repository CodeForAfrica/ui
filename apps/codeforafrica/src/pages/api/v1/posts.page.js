import { getPosts } from "@/codeforafrica/lib/data/utils/posts";
import api from "@/codeforafrica/lib/payload";

export default async function handler(req, res) {
  const { primaryTag, ...other } = req.query;
  if (!primaryTag) {
    return res.status(400).json({ error: "Primary Tag is required" });
  }
  try {
    const data = await getPosts(api, other, primaryTag);
    return res.json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
}
