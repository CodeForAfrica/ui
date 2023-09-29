import { getProjects } from "@/codeforafrica/lib/data/utils/projects";

async function ourWork(block, api, context) {
  const { query } = context;
  const data = await getProjects(api, query);
  const { docs: allProjects } = await api.getCollection("projects");
  const projectTags = allProjects.map(({ tag }) => tag).filter(Boolean);
  const tags = [{ name: "All", slug: "all" }, ...new Set(projectTags)];

  return {
    tags,
    ...block,
    ...data,
    slug: block.blockType,
  };
}

export default ourWork;
