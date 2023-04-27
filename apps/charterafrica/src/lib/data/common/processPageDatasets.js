import fetchDatasets from "@/charterafrica/lib/openAfrica";

async function processPageDatasets(page, api) {
  const { blocks } = page;
  const datasetsIndex = blocks.findIndex(({ slug }) => slug === "datasets");
  if (datasetsIndex > -1) {
    const { organizationId } = await api.findGlobal("datasets");
    const datasets = await fetchDatasets(organizationId, {
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
