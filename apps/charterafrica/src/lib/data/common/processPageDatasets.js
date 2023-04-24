import fetchDatasets from "@/charterafrica/lib/openAfrica";

async function processPageDatasets(page, api) {
  const { blocks } = page;
  const datasetsIndex = blocks.findIndex(({ slug }) => slug === "datasets");

  const { organizationId } = await api.getGlobal("datasets");

  if (datasetsIndex > -1) {
    const datasets = await fetchDatasets({
      rows: 10,
      start: 0,
      organizationId,
    });

    blocks[datasetsIndex] = {
      slug: "datasets",
      datasets,
    };
  }
  return page;
}

export default processPageDatasets;
