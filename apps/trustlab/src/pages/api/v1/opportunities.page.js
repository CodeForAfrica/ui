import getOpportunities from "@/trustlab/lib/data/getOpportunities";
import api from "@/trustlab/lib/payload";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      page = 1,
      type,
      locale,
      year,
      month,
      location,
      opportunity,
      search,
      sort,
    } = req.query;

    const limit = parseInt(req.query?.limit, 10) || 12;
    const options = {
      page: parseInt(page, 10),
      limit,
      type,
      locale,
      year,
      month,
      location,
      opportunity,
      ...(search ? { search } : {}),
      ...(sort ? { sort } : {}),
    };

    const result = await getOpportunities(api, options);

    return res.status(200).json(result);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error fetching opportunities:", error);
    return res.status(500).json({ error: "Failed to fetch opportunities" });
  }
}
