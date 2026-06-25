import api from "@/trustlab/lib/payload";
import { buildDateRangeCondition } from "@/trustlab/utils/dateFilters";
import {
  normalizeQueryList,
  singleQueryValue,
} from "@/trustlab/utils/queryParams";
import { getReports } from "@/trustlab/utils/reports";

export default async function handler(req, res) {
  const { method } = req;

  if (method === "GET") {
    // Multi-value params (year, month, report) arrive as arrays when
    // repeated in the URL and are normalized downstream. Single-valued
    // params are coerced to one value (the last, if repeated).
    const { year, month, report } = req.query;
    const reportsType = singleQueryValue(req.query.reportsType);
    const search = singleQueryValue(req.query.search);
    const sort = singleQueryValue(req.query.sort);
    const page = singleQueryValue(req.query.page);
    const limit = singleQueryValue(req.query.limit) ?? 12;

    // Build filters
    const andConditions = [];
    if (reportsType) {
      andConditions.push({ reportType: { equals: reportsType } });
    }

    // Title search
    if (search) {
      andConditions.push({ title: { like: search } });
    }

    // Reports (slug) filter
    const reportSlugs = normalizeQueryList(report);
    if (reportSlugs.length) {
      andConditions.push({ slug: { in: reportSlugs } });
    }

    const dateCondition = buildDateRangeCondition({ month, year });
    if (dateCondition) {
      andConditions.push(dateCondition);
    }

    const where = andConditions.length > 0 ? { and: andConditions } : {};

    try {
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
      const validatedSort =
        sort && ALLOWED_SORT.includes(sort) ? sort : "-date";

      const result = await getReports(api, {
        limit,
        page: page || 1,
        sort: validatedSort,
        where,
      });
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch reports" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
