import fetchDatasets from "@/charterafrica/lib/openAfrica";

const datasets = async (req, res) => {
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
    const data = await fetchDatasets({
      q,
      rows: perPage,
      start: page,
      sort,
      tags,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }

  return res.status(404).json({ message: "ERROR FETCHING DATASETS" });
};

const sourceMap = {
  datasets,
};

export default async function handler(req, res) {
  const {
    query: { path },
  } = req;
  const response = sourceMap[path];
  if (response) {
    return response(req, res);
  }
  return res.status(404).json({ message: "UNKNOWN_SOURCE", path });
}
