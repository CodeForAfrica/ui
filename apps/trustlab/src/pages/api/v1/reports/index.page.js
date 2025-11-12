import api from "@/trustlab/lib/payload";
import { getReports } from "@/trustlab/utils/reports";

export default async function handler(req, res) {
  const { method } = req;

  if (method === "GET") {
    const { page, sort, years, months, reports, reportsType } = req.query;

    const monthRange = (year, monthNumber) => {
      // monthNumber is 1-12
      const mIdx = monthNumber - 1;
      const start = new Date(Date.UTC(year, mIdx, 1, 0, 0, 0, 0));
      const end =
        mIdx === 11
          ? new Date(Date.UTC(year + 1, 0, 1, 0, 0, 0, 0))
          : new Date(Date.UTC(year, mIdx + 1, 1, 0, 0, 0, 0));
      return {
        and: [
          { date: { greater_than_equal: start.toISOString() } },
          { date: { less_than: end.toISOString() } },
        ],
      };
    };
    const yearRange = (year) => {
      const start = new Date(Date.UTC(year, 0, 1, 0, 0, 0, 0));
      const end = new Date(Date.UTC(year + 1, 0, 1, 0, 0, 0, 0));
      return {
        and: [
          { date: { greater_than_equal: start.toISOString() } },
          { date: { less_than: end.toISOString() } },
        ],
      };
    };

    // Build filters
    const andConditions = [{ reportType: { equals: reportsType } }];

    // Reports (slug) filter
    if (reports) {
      const reportsArray = reports
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      if (reportsArray.length) {
        andConditions.push({ slug: { in: reportsArray } });
      }
    }

    // Years/months on date
    const yearsArray = years
      ? years
          .split(",")
          .map((y) => parseInt(y, 10))
          .filter((y) => !Number.isNaN(y))
      : [];

    const monthsArray = months
      ? months
          .split(",")
          .map((m) => parseInt(m, 10))
          .filter((m) => !Number.isNaN(m) && m >= 1 && m <= 12)
      : [];

    const dateOrConditions = [];
    const currentYear = new Date().getFullYear();
    const defaultStartYear = 2000; // used when only months are provided

    if (yearsArray.length && monthsArray.length) {
      // Specific month(s) within specific year(s)
      yearsArray.forEach((y) => {
        monthsArray.forEach((m) => {
          dateOrConditions.push(monthRange(y, m));
        });
      });
    } else if (yearsArray.length) {
      // Whole year(s)
      yearsArray.forEach((y) => {
        dateOrConditions.push(yearRange(y));
      });
    } else if (monthsArray.length) {
      // Month(s) across all years in range
      for (let y = defaultStartYear; y <= currentYear; y += 1) {
        monthsArray.forEach((m) => {
          dateOrConditions.push(monthRange(y, m));
        });
      }
    }

    if (dateOrConditions.length) {
      andConditions.push({ or: dateOrConditions });
    }

    const where = andConditions.length > 0 ? { and: andConditions } : {};

    try {
      const result = await getReports(api, {
        limit: 9,
        page: page || 1,
        sort: sort || "-createdAt",
        where,
      });
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch reports" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
