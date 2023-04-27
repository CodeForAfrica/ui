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
  const pieChartData = [];
  datasets.forEach((dataset) => {
    const { type } = dataset;
    const index = pieChartData.findIndex((item) => item.id === type);
    if (index >= 0) {
      pieChartData[index].value += 1;
    } else {
      pieChartData.push({
        id: type,
        label: type,
        value: 1,
        color: type === "dataset" ? "#D3C5CC" : "#FBE49A",
      });
    }
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
