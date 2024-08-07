import { getPosts } from "@/civicsignalblog/lib/data/utils/posts";
import api from "@/civicsignalblog/lib/payload";

export default async function handler(req, res) {
  const { primaryTag, featured, ...other } = req.query;
  if (!primaryTag) {
    return res.status(400).json({ error: "Primary Tag is required" });
  }
  try {
    const data = await getPosts(
      api,
      {
        ...other,
        ...(featured && {
          where: {
            slug: {
              not_equals: featured,
            },
          },
        }),
      },
      primaryTag,
    );
    return res.json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
}
