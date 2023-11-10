function getQuery(fields, query) {
  const { q, tag } = query;
  const whereQuery = {
    or: q ? fields.map((field) => ({ [field]: { like: q } })) : [],
  };
  if (tag) {
    whereQuery["tag.slug"] = {
      like: tag,
    };
  }
  return whereQuery;
}

export async function getProjects(api, params) {
  const { page: queryPage = 1 } = params;
  const fields = ["name", "title", "tag.name", "tagLine"];
  const options = {
    limit: 6,
    page: queryPage,
    // We want case-insensitive sort by name; slug is the closest thing to it.
    sort: "slug",
    where: getQuery(fields, params),
  };
  const {
    docs: results,
    totalPages,
    page,
  } = await api.getCollection("projects", options);

  return {
    results,
    pagination: {
      count: totalPages,
      page,
    },
  };
}

export default undefined;
