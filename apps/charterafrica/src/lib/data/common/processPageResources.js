import fetchDatasets from "@/charterafrica/lib/openAfrica";

// eslint-disable-next-line import/prefer-default-export
export async function processPageDatasets(page, api) {
  const { blocks } = page;
  const { organizationId } = await api.findGlobal("datasets");
  const data = await fetchDatasets(organizationId, {
    rows: 10,
    start: 0,
  });
  const { count, datasets, countries, tags } = data;
  const pieChartData = [
    {
      id: "dataset",
      label: "Datasets",
      value: count,
      color: "#D3C5CC",
    },
    {
      id: "document",
      label: "Documents",
      value: 0,
      color: "#FBE49A",
    },
  ];

  // TODO: fetch all documents count
  datasets.forEach((dataset) => {
    pieChartData[1].value += dataset.documents.length;
  });

  blocks.push({
    slug: "datasets-charts",
    data: pieChartData,
  });

  blocks.push({
    slug: "datasets",
    count,
    countries,
    data: datasets,
    tags,
  });

  return page;
}
