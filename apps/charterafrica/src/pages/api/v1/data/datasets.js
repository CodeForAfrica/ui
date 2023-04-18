import { fetchDatasets } from "@/charterafrica/lib/openAfrica";

export default async function handler(req, res) {
  const {
    query: { organization, tags = [], q = "" },
  } = req;

  if (organization) {
    try {
      const organizationQuery = organization
        ? `organization:${organization}`
        : "";

      const tagsQuery = tags.length ? `tags:(${tags.join(" OR ")})` : "";

      const filterQuery = [organizationQuery, tagsQuery]
        .filter(Boolean)
        .join(" AND ");

      const datasets = await fetchDatasets(q, {
        fq: filterQuery,
      });
      res.status(200).json(datasets);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  return res.json(404).json({ message: "NO ORGANIZATION PROVIDED" });
}
