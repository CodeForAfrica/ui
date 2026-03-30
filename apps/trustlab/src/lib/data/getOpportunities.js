import formatDate from "@/trustlab/payload/utils/formatDate";

function fullSlugFromParents(doc) {
  if (!doc) {
    return "";
  }
  const { slug, parent } = doc;
  if (!parent) {
    return slug;
  }
  return `${fullSlugFromParents(parent)}/${slug}`;
}

async function getOpportunities(api, options = {}) {
  const {
    page = 1,
    limit = 12,
    type,
    locale,
    sort = "-createdAt",
    location,
    year,
    opportunity: id,
    month,
  } = options;

  const where = {};

  if (type && type !== "all") {
    where.type = { equals: type };
  }

  if (id) {
    where.id = { equals: id };
  }

  if (location) {
    where.location = { contains: location };
  }

  if (year || month) {
    const andConditions = [];

    if (year) {
      const startOfYear = new Date(year, 0, 1).toISOString();
      const endOfYear = new Date(year, 11, 31, 23, 59, 59, 999).toISOString();
      andConditions.push({
        date: {
          greater_than_equal: startOfYear,
        },
      });
      andConditions.push({
        date: {
          less_than_equal: endOfYear,
        },
      });
    }

    if (month) {
      // month is 1-based (1 = January)
      const monthIndex = parseInt(month, 10) - 1;
      const targetYear = year || new Date().getFullYear();
      const startOfMonth = new Date(targetYear, monthIndex, 1).toISOString();
      const endOfMonth = new Date(
        targetYear,
        monthIndex + 1,
        0,
        23,
        59,
        59,
        999,
      ).toISOString();

      andConditions.push({
        date: {
          greater_than_equal: startOfMonth,
        },
      });
      andConditions.push({
        date: {
          less_than_equal: endOfMonth,
        },
      });
    }

    if (andConditions.length > 0) {
      where.and = andConditions;
    }
  }

  const result = await api.getCollection("opportunities", {
    where,
    page,
    limit,
    sort,
    locale,
    depth: 2,
  });

  const typeSlugMap = {
    incubator: "incubators",
    "intelligence-briefing": "intelligence-briefings",
    baraza: "barazas",
  };

  const parentSlug = typeSlugMap[type] || "opportunities";

  // Fetch parent page once for all opportunities
  let basePath = "";
  try {
    const { docs } = await api.findPage(parentSlug, {});
    const parentDoc = docs?.[0];
    if (parentDoc) {
      basePath = `/${fullSlugFromParents(parentDoc)}`;
    }
  } catch (error) {
    // Fallback to default path if parent page not found
    basePath = `/${parentSlug}`;
  }

  const opportunities = await Promise.all(
    result.docs.map(async (doc) => {
      const image = doc.image ?? null;
      return {
        id: doc.id,
        title: doc.title,
        type: doc.type,
        image,
        caption: doc.caption ?? null,
        location: doc.location ?? null,
        date:
          (doc.date ?? doc.createdAt)
            ? formatDate(doc.date ?? doc.createdAt, "dd-MM-yyyy")
            : null,
        slug: doc.slug,
        link: {
          href: `${basePath}/${doc.slug}`,
        },
        participatingOrganizations: doc.participatingOrganizations ?? [],
      };
    }),
  );

  return {
    docs: opportunities,
    page: result.page,
    totalPages: result.totalPages,
    totalDocs: result.totalDocs,
    hasNextPage: result.hasNextPage,
    hasPrevPage: result.hasPrevPage,
  };
}

export default getOpportunities;
