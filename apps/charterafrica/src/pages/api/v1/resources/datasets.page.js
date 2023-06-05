import fetchDatasets from "@/charterafrica/lib/openAfrica";

async function datasets(req, res) {
  const {
    query: {
      sort = "metadata_created desc",
      tags,
      countries,
      q = "",
      page = 1,
      path: pathname,
      locale,
      organizationId,
    },
  } = req;

  try {
    const data = await fetchDatasets(organizationId, pathname, {
      q,
      page,
      sort,
      tags: tags?.split(","),
      countries: countries?.split(","),
      locale,
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
