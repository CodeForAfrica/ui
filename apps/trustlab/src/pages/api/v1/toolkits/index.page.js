import api from "@/trustlab/lib/payload";
import { buildDateRangeCondition } from "@/trustlab/utils/dateFilters";
import { singleQueryValue } from "@/trustlab/utils/queryParams";

export default async function handler(req, res) {
  const { method } = req;

  if (method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // year/month are multi-value (repeated in the URL) and normalized
  // downstream; the rest are single-valued.
  const { year, month } = req.query;
  const sort = singleQueryValue(req.query.sort);
  const page = singleQueryValue(req.query.page);
  const limit = singleQueryValue(req.query.limit) ?? 12;

  const andConditions = [];
  const dateCondition = buildDateRangeCondition({
    field: "createdAt",
    month,
    year,
  });
  if (dateCondition) {
    andConditions.push(dateCondition);
  }

  const where = andConditions.length > 0 ? { and: andConditions } : {};

  try {
    const result = await api.getCollection("toolkits", {
      limit: Number(limit),
      page: Number(page) || 1,
      sort: sort || "-createdAt",
      where,
    });

    return res.status(200).json({
      toolkits: result?.docs || [],
      pagination: {
        page: result?.page || 1,
        count: result?.totalPages || 1,
      },
    });
  } catch (error) {
    console.error("Error fetching toolkits:", error);
    return res.status(500).json({ error: "Failed to fetch toolkits" });
  }
}
