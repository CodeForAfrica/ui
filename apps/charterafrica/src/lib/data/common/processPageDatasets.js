import fetchDatasets from "@/charterafrica/lib/openAfrica";

export default async function processPageDatasets(page, api) {
  const { blocks } = page;
  const { organizationId, charts, sortOptions } = await api.findGlobal(
    "datasets"
  );
  const {
    showCharts,
    options: {
      datasetsLabel,
      datasetsColor,
      datasetsCount,
      documentsLabel,
      documentsColor,
      documentsCount,
    },
  } = charts;

  if (showCharts) {
    blocks.push({
      slug: "datasets-charts",
      data: [
        {
          id: "dataset",
          label: datasetsLabel,
          value: datasetsCount,
          color: datasetsColor,
        },
        {
          id: "document",
          label: documentsLabel,
          value: documentsCount,
          color: documentsColor,
        },
      ],
    });
  }

  const data = await fetchDatasets(organizationId, {
    rows: 10,
    start: 0,
  });
  const { count, datasets, countries, tags } = data;

  blocks.push({
    slug: "datasets",
    count,
    countries,
    data: datasets,
    tags,
    sortOptions,
  });

  // SWR fallback
  const swrKey = `/api/v1/data/datasets`;
  const qs = `?rows=10&start=0`;
  // eslint-disable-next-line no-param-reassign
  page.fallback = {
    [`${swrKey}${qs}`]: data,
  };

  return page;
}
