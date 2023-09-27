import { getPosts } from "@/codeforafrica/lib/data/utils/posts";
import api from "@/codeforafrica/lib/payload";

export default async function handler(req, res) {
  try {
    const data = await getPosts(api, req.query, "stories");
    return res.json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
}
