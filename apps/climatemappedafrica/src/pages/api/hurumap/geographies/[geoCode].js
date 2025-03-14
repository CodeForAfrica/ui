import { fetchCachedProfileGeography } from "@/climatemappedafrica/lib/hurumap";

export default async function index(req, res) {
  const { profileId, baseUrl } = req.query;
  if (req.method === "GET") {
    try {
      const { geoCode } = req.query;
      const result = await fetchCachedProfileGeography(geoCode, {
        baseUrl,
        profileId,
      });
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  return res.status(405).end();
}
