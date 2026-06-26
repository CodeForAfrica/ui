import formatDate from "@/trustlab/payload/utils/formatDate";
import { buildDateRangeCondition } from "@/trustlab/utils/dateFilters";
import { normalizeQueryList } from "@/trustlab/utils/queryParams";

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

function addExactMatchCondition(andConditions, field, value) {
  const values = normalizeQueryList(value);
  if (values.length === 1) {
    andConditions.push({ [field]: { equals: values[0] } });
  } else if (values.length > 1) {
    andConditions.push({ [field]: { in: values } });
  }
}

async function getOpportunities(api, options = {}) {
  const {
    page = 1,
    limit = 12,
    type,
    locale,
    sort,
    location,
    year,
    opportunity: id,
    month,
    search,
  } = options;

  const andConditions = [];

  if (type && type !== "all") {
    andConditions.push({ type: { equals: type } });
  }

  if (search) {
    // Fuzzy matching lives in search (the location filter itself is exact).
    andConditions.push({
      or: [{ title: { like: search } }, { location: { like: search } }],
    });
  }

  if (id) {
    addExactMatchCondition(andConditions, "id", id);
  }

  if (location) {
    addExactMatchCondition(andConditions, "location", location);
  }

  const dateCondition = buildDateRangeCondition({ month, year });
  if (dateCondition) {
    andConditions.push(dateCondition);
  }

  const where = andConditions.length ? { and: andConditions } : {};

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
