function getQueryFromParams(params) {
  const { q } = params;
  const fields = ["name", "title", "country"];
  const or = q ? fields.map((f) => ({ [f]: { like: q } })) : [];

  return {
    and: [
      {
        active: {
          equals: true,
        },
      },
      {
        or,
      },
    ],
  };
}

// TODO(kilemensi): Confirm if params is undefined when using static build
export async function getMembers(api, params = {}) {
  const { page: queryPage = 1 } = params;
  const options = {
    limit: 18,
    page: queryPage,
    sort: "name",
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
