import { getOpportunities } from "@/codeforafrica/lib";

const QUERY_PARAM_NAMES = ["tag", "page", "q"];

export default function handler(req, res) {
  if (req.method === "GET") {
    const { query: originalQuery } = req;
    const query = Object.keys(originalQuery).reduce((acc, key) => {
      const paramName = key.toLocaleLowerCase();
      if (QUERY_PARAM_NAMES.includes(key)) {
        acc[paramName] = originalQuery[key];
      }
      return acc;
    }, {});
    const projects = getOpportunities(query);
    return res.status(200).json(projects);
  }

  return res.status(405).end();
}
