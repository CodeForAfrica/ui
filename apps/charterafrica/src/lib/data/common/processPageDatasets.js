import fetchDatasets from "@/charterafrica/lib/openAfrica";

export default async function processPageDatasets(page, api) {
  const { blocks } = page;
  const { organizationId } = await api.findGlobal("openAfrica");
  const data = await fetchDatasets(organizationId);
  const { count, datasets, countries, tags, totalPages } = data;

  const datasetsIndex = blocks.findIndex(({ slug }) => slug === "datasets");
  const resourceHeaderIndex = blocks.findIndex(
    ({ slug }) => slug === "resource-header"
  );
  if (datasetsIndex > -1) {
    const { statistics } = blocks[datasetsIndex];
    blocks[datasetsIndex] = {
      ...blocks[datasetsIndex],
      count,
      countries,
      data: datasets,
      tags,
      totalPages,
    };

    if (resourceHeaderIndex > -1) {
      const { resourceType, title } = blocks[resourceHeaderIndex];
      if (resourceType === "dataset") {
        blocks[resourceHeaderIndex] = {
          slug: "datasets-charts",
          title,
          data: Object.keys(statistics).map((key) => {
            return {
              ...statistics[key],
              id: key,
              value: statistics[key].count,
            };
          }),
        };
      }
    }
  }
  const swrKey = `/api/v1/data/datasets`;
  const qs = `?rows=10&start=0`;
  // eslint-disable-next-line no-param-reassign
  page.fallback = {
    [`${swrKey}${qs}`]: data,
  };

  return page;
}
