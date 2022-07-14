import { getProjects } from "@/codeforafrica/lib";

const QUERY_PARAM_NAMES = ["category", "page", "page-size", "query"];

export default function handler(req, res) {
  if (req.method === "GET") {
    const { query: originalQuery } = req;
    const query = Object.keys(originalQuery).reduce((acc, k) => {
      const key = k.toLocaleLowerCase();
      if (QUERY_PARAM_NAMES.includes(key)) {
        acc[key] = originalQuery[k];
      }
      return acc;
    }, {});
    const projects = getProjects(query);
    return res.status(200).json(projects);
  }

  return res.status(405).end();
}
