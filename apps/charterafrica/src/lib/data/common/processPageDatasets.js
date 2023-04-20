import { fetchDatasets } from "@/charterafrica/lib/openAfrica";

async function processPageDatasets(page) {
  const { blocks } = page;

  const datasetsIndex = blocks.findIndex(({ slug }) => slug === "datasets");

  if (datasetsIndex > -1) {
    const { organizationId } = blocks[datasetsIndex];
    const datasets = await fetchDatasets({
      fq: `organization:${organizationId}`,
      rows: 10,
      start: 0,
    });

    blocks[datasetsIndex] = {
      slug: "datasets",
      datasets,
      fq: `organization:${organizationId}`,
    };
  }

  return page;
}

export default processPageDatasets;
