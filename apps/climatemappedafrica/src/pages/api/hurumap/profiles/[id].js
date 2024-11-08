import { fetchProfile } from "@/climatemappedafrica/lib/hurumap";

let cache = null;
let cacheExpiry = 0;

export default async function handler(req, res) {
  const { id } = req.query;
  const { BASE_URL } = req.query;
  if (req.method === "GET") {
    const now = Date.now();

    if (cache && now < cacheExpiry) {
      return res.status(200).json(cache);
    }

    try {
      const result = await fetchProfile(BASE_URL, id);
      cache = result;
      cacheExpiry = now + 5 * 60 * 1000;
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  return res.status(405).end();
}
