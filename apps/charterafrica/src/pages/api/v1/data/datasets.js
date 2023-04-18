import { fetchDatasets } from "@/charterafrica/lib/openAfrica";

export default async function handler(req, res) {
  const {
    query: {
      page = 0,
      perPage = 10,
      sort = "metadata_created desc",
      tags = [],
      q = "",
      fq = "",
    },
  } = req;

  const tagsQuery = tags.length ? `tags:(${tags.join(" OR ")})` : "";

  const filterQuery = [fq, tagsQuery].filter(Boolean).join(" AND ");

  try {
    const datasets = await fetchDatasets({
      q,
      fq: filterQuery,
      rows: perPage,
      start: page,
      sort,
    });
    res.status(200).json(datasets);
  } catch (error) {
    res.status(500).json({ error });
  }

  return res.status(404).json({ message: "ERROR FETCHING DATASETS" });
}
