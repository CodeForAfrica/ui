import api from "@/trustlab/lib/payload";

export default async function handler(req, res) {
  const { method } = req;

  if (method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { page, sort, years, months, limit } = req.query;

  const monthRange = (year, monthNumber) => {
    const mIdx = monthNumber - 1;
    const start = new Date(Date.UTC(year, mIdx, 1, 0, 0, 0, 0));
    const end =
      mIdx === 11
        ? new Date(Date.UTC(year + 1, 0, 1, 0, 0, 0, 0))
        : new Date(Date.UTC(year, mIdx + 1, 1, 0, 0, 0, 0));
    return {
      and: [
        { createdAt: { greater_than_equal: start.toISOString() } },
        { createdAt: { less_than: end.toISOString() } },
      ],
    };
  };

  const yearRange = (year) => {
    const start = new Date(Date.UTC(year, 0, 1, 0, 0, 0, 0));
    const end = new Date(Date.UTC(year + 1, 0, 1, 0, 0, 0, 0));
    return {
      and: [
        { createdAt: { greater_than_equal: start.toISOString() } },
        { createdAt: { less_than: end.toISOString() } },
      ],
    };
  };

  const andConditions = [];

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
  const defaultStartYear = 2000;

  if (yearsArray.length && monthsArray.length) {
    yearsArray.forEach((y) => {
      monthsArray.forEach((m) => {
        dateOrConditions.push(monthRange(y, m));
      });
    });
  } else if (yearsArray.length) {
    yearsArray.forEach((y) => {
      dateOrConditions.push(yearRange(y));
    });
  } else if (monthsArray.length) {
    for (let y = defaultStartYear; y <= currentYear; y += 1) {
      monthsArray.forEach((m) => {
        dateOrConditions.push(monthRange(y, m));
      });
    }
  }

  if (dateOrConditions.length) {
    andConditions.push({ or: dateOrConditions });
  }

  const where = andConditions.length ? { and: andConditions } : {};

  try {
    const result = await api.getCollection("playbooks", {
      limit: Number(limit),
      page: Number(page) || 1,
      sort: sort || "-createdAt",
      where,
    });

    return res.status(200).json({
      playbooks: result?.docs || [],
      pagination: {
        page: result?.page || 1,
        count: result?.totalPages || 1,
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error fetching playbooks:", error);
    return res.status(500).json({ error: "Failed to fetch playbooks" });
  }
}
