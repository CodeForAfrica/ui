import { fetchProfileGeography } from "@/climatemappedafrica/lib/hurumap";

export default async function index(req, res) {
  const { profileId, BASE_URL } = req.query;
  if (req.method === "GET") {
    try {
      const { geoCode } = req.query;
      const result = await fetchProfileGeography(geoCode, {
        BASE_URL,
        profileId,
      });
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  return res.status(405).end();
}
