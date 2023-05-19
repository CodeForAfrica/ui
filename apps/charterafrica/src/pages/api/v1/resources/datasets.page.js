import fetchDatasets from "@/charterafrica/lib/openAfrica";
import payload from "@/charterafrica/lib/payload";

async function datasets(req, res) {
  const {
    query: {
      sort = "metadata_created desc",
      tags,
      countries,
      q = "",
      page = 1,
    },
  } = req;

  try {
    const { organizationId } = await payload.findGlobal("openAfrica");
    const data = await fetchDatasets(organizationId, {
      q,
      page,
      sort,
      tags: tags?.split(","),
      countries: countries?.split(","),
    });

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error });
  }
}

export default async function handler(req, res) {
  try {
    return await datasets(req, res);
  } catch (error) {
    return res.status(500).json({ error });
  }
}
