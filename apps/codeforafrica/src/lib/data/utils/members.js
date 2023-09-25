const orQueryBuilder = (fields, search) => {
  if (!search) {
    return [];
  }
  return fields.map((field) => ({ [field]: { like: search } }));
};

function getQueryFromParams(params) {
  const { field, tag } = params;
  if (field && tag) {
    return {
      [field]: {
        like: tag,
      },
    };
  }
  return null;
}

export async function getMembers(api, params) {
  const { page: queryPage = 1, q } = params;
  const fields = ["name", "title", "country"];
  const orQuery = orQueryBuilder(fields, q);
  const options = {
    limit: 18,
    page: queryPage,
    where: {
      or: orQuery,
      ...getQueryFromParams(params),
    },
  };
  const {
    docs: results,
    totalPages,
    page,
  } = await api.getCollection("members", options);

  return {
    results,
    pagination: {
      count: totalPages,
      page,
    },
  };
}

export default undefined;
