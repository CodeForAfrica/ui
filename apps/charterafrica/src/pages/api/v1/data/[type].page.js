import fetchDatasets from "@/charterafrica/lib/openAfrica";
import payload from "@/charterafrica/lib/payload";

async function datasets(req, res) {
  const {
    query: {
      page = 1,
      pageSize = 10,
      sort = "metadata_created desc",
      tags = [],
      q = "",
    },
  } = req;

  try {
    const { organizationId } = await payload.findGlobal("datasets");
    const data = await fetchDatasets(organizationId, {
      q,
      rows: pageSize,
      start: (page - 1) * pageSize,
      sort,
      tags,
    });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error });
  }
}

const dataHandlerMap = {
  datasets,
};

export default async function handler(req, res) {
  const {
    query: { type },
  } = req;
  const typeHandler = dataHandlerMap[type];
  if (typeHandler) {
    return typeHandler(req, res);
  }
  return res.status(404).json({ message: "UNKNOWN_DATA_TYPE", type });
}
