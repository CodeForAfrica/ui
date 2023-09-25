import { getProjects } from "@/codeforafrica/lib/data/utils/projects";
import api from "@/codeforafrica/lib/payload";

export default async function handler(req, res) {
  try {
    const data = await getProjects(api, req.query);
    return res.json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
}
