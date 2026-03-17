import getOpportunities from "@/trustlab/lib/data/getOpportunities";
import api from "@/trustlab/lib/payload";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      page = 1,
      limit = 12,
      type,
      locale,
      year,
      month,
      location,
      opportunity,
    } = req.query;

    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      type,
      locale,
      year,
      month,
      location,
      opportunity,
    };

    const result = await getOpportunities(api, options);

    return res.status(200).json(result);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error fetching opportunities:", error);
    return res.status(500).json({ error: "Failed to fetch opportunities" });
  }
}
