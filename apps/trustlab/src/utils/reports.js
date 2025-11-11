export async function getReports(api, options) {
  const {
    docs: reports,
    totalPages,
    page,
  } = await api.getCollection("reports", {
    ...options,
  });

  return {
    reports,
    pagination: {
      count: totalPages,
      page,
    },
  };
}

export default getReports;
