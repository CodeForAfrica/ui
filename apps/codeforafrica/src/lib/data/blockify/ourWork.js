import { getProjects } from "@/codeforafrica/lib/data/utils/projects";

async function ourWork(block, api, context) {
  const { query } = context;
  const data = await getProjects(api, query);
  const { docs: allProjects } = await api.getCollection("projects");
  const projectTags = allProjects.map(({ tag }) => tag).filter(Boolean);
  const tags = Array.from(new Set(projectTags.map((item) => item.id))).map(
    (id) => {
      return projectTags.find((item) => item.id === id);
    },
  );

  return {
    tags: [{ name: "All", slug: "all" }, ...tags],
    ...block,
    ...data,
    slug: block.blockType,
  };
}

export default ourWork;
