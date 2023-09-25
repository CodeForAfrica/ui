function getQueryFromParams(params) {
  const { field, tag, q } = params;
  const fields = ["name", "title", "country"];
  const or = q ? fields.map((f) => ({ [f]: { like: q } })) : [];
  if (field && tag) {
    if (field === "team") {
      return {
        or,
        "team.name": {
          like: tag,
        },
      };
    }
    return {
      or,
      [field]: {
        like: tag,
      },
    };
  }
  return { or };
}

export async function getMembers(api, params) {
  const { page: queryPage = 1 } = params;
  const options = {
    limit: 18,
    page: queryPage,
    where: getQueryFromParams(params),
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
