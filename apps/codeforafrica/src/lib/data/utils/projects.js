const orQueryBuilder = (fields, search) => {
  if (!search) {
    return [];
  }
  return fields.map((field) => ({ [field]: { like: search } }));
};

export async function getProjects(api, params) {
  const { page: queryPage = 1, q } = params;
  const fields = ["name", "title", "tags", "tagLine"];
  const orQuery = orQueryBuilder(fields, q);
  const options = {
    limit: 6,
    page: queryPage,
    where: {
      or: orQuery,
    },
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
