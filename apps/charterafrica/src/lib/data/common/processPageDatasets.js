import fetchDatasets from "@/charterafrica/lib/openAfrica";

async function processPageDatasets(page) {
  const { blocks } = page;
  const datasetsIndex = blocks.findIndex(({ slug }) => slug === "datasets");

  if (datasetsIndex > -1) {
    const datasets = await fetchDatasets({
      rows: 10,
      start: 0,
    });

    blocks[datasetsIndex] = {
      slug: "datasets",
      datasets,
    };
  }
  return page;
}

export default processPageDatasets;
