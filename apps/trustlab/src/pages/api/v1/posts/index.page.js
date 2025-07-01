import api from "@/trustlab/lib/payload";
import { getPosts } from "@/trustlab/utils/post";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { page = 1, path = "" } = req.query;

  const posts = await getPosts(api, path, {
    page: Number(page),
    limit: 1,
  });

  return res.status(200).json({ ...posts });
}
