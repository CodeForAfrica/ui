export default async function updateDatasetsStatistics() {
  const { CRONJOBS_SECRET_KEY } = process.env;
  if (!CRONJOBS_SECRET_KEY) {
    return;
  }
  fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/v1/data/datasets-stats`, {
    headers: {
      Authorization: CRONJOBS_SECRET_KEY,
    },
  });
}
