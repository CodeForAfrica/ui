import fetchDatasets, {
  getOrganizationStatistics,
} from "@/charterafrica/lib/openAfrica";

// eslint-disable-next-line import/prefer-default-export
export async function processPageDatasets(page, api) {
  const { blocks } = page;
  const { organizationId } = await api.findGlobal("datasets");
  const { datasetCount, documentsCount } = await getOrganizationStatistics(
    organizationId
  );
  const pieChartData = [
    {
      id: "dataset",
      label: "Datasets",
      value: datasetCount,
      color: "#D3C5CC",
    },
    {
      id: "document",
      label: "Documents",
      value: documentsCount,
      color: "#FBE49A",
    },
  ];

  blocks.push({
    slug: "datasets-charts",
    data: pieChartData,
  });

  const data = await fetchDatasets(organizationId, {
    rows: 10,
    start: 0,
  });
  const { count, datasets, countries, tags } = data;
  const resources = datasets.flatMap((dataset) => dataset.documents);

  blocks.push({
    slug: "datasets",
    count,
    countries,
    data: datasets,
    documents: resources,
    tags,
  });

  return page;
}
