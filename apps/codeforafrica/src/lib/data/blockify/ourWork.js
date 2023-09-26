import { getProjects } from "@/codeforafrica/lib/data/utils/projects";

async function ourWork(block, api, context) {
  const { query } = context;
  const data = await getProjects(api, query);
  const { docs } = await api.getCollection("tag");
  const tags = docs.map(({ name }) => name);

  return {
    tags,
    ...block,
    ...data,
    slug: block.blockType,
  };
}

export default ourWork;
