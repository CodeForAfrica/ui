import { getProjects } from "@/codeforafrica/lib/data/utils/projects";

async function ourWork(block, api, context) {
  const { query } = context;
  const data = await getProjects(api, query);

  return {
    ...block,
    ...data,
    slug: block.blockType,
  };
}

export default ourWork;
