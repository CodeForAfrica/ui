export default async function updateDatasetsStatistics() {
  const { RESOURCES_SECRET_TOKEN } = process.env;
  if (!RESOURCES_SECRET_TOKEN) {
    return;
  }
  fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/v1/data/datasets-stats`, {
    headers: {
      Authorization: RESOURCES_SECRET_TOKEN,
    },
  });
}
