export async function getReports(api, options) {
  const { docs, totalPages, page } = await api.getCollection("reports", {
    ...options,
  });

  const reports = docs.map((doc) => ({
    ...doc,
    date: new Date(doc.date).toISOString().split("T")[0],
  }));
  return {
    reports,
    pagination: {
      count: totalPages,
      page,
    },
  };
}

export default getReports;
