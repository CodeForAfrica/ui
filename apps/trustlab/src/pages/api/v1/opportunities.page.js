import getOpportunities from "@/trustlab/lib/data/getOpportunities";
import api from "@/trustlab/lib/payload";
import { singleQueryValue } from "@/trustlab/utils/queryParams";

const ALLOWED_SORT = [
  "-date",
  "date",
  "-title",
  "title",
  "-createdAt",
  "createdAt",
  "-updatedAt",
  "updatedAt",
];

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Multi-value params (location, opportunity, year, month) arrive as arrays
    // when repeated in the URL and are normalized downstream. Single-valued
    // params are coerced to one value (the last, if repeated).
    const { year, month, location, opportunity } = req.query;
    const type = singleQueryValue(req.query.type);
    const locale = singleQueryValue(req.query.locale);
    const search = singleQueryValue(req.query.search);
    const sort = singleQueryValue(req.query.sort);
    const page = singleQueryValue(req.query.page) ?? 1;
    const limit = parseInt(singleQueryValue(req.query.limit), 10) || 12;
    const validatedSort =
      sort && ALLOWED_SORT.includes(sort) ? sort : undefined;

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
      ...(validatedSort ? { sort: validatedSort } : {}),
    };

    const result = await getOpportunities(api, options);

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching opportunities:", error);
    return res.status(500).json({ error: "Failed to fetch opportunities" });
  }
}
