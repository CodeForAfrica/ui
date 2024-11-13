import { fetchProfiles } from "@/climatemappedafrica/lib/hurumap";

let cache = null;
let cacheExpiry = 0;

export default async function handler(req, res) {
  const { baseUrl } = req.query;
  if (req.method === "GET") {
    const now = Date.now();

    if (cache && now < cacheExpiry) {
      return res.status(200).json(cache);
    }

    try {
      const result = await fetchProfiles(baseUrl);
      cache = result;
      cacheExpiry = now + 5 * 60 * 1000;
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  return res.status(405).end();
}
