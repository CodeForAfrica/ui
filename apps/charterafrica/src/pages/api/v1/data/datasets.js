import fetchDatasets from "@/charterafrica/lib/openAfrica";

export default async function handler(req, res) {
  const {
    query: {
      page = 0,
      perPage = 10,
      sort = "metadata_created desc",
      tags = [],
      q = "",
    },
  } = req;

  try {
    const datasets = await fetchDatasets({
      q,
      rows: perPage,
      start: page,
      sort,
      tags,
    });
    res.status(200).json(datasets);
  } catch (error) {
    res.status(500).json({ error });
  }

  return res.status(404).json({ message: "ERROR FETCHING DATASETS" });
}
