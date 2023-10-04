import { sortTags } from "@/codeforafrica/lib/data/utils/posts";

async function ourWorkShowcase(block, api) {
  const { docs: projects } = await api.getCollection("projects");
  const projectTags = projects.map(({ tag }) => tag).filter(Boolean);
  const tags = sortTags(projectTags);

  return {
    tags,
    ...block,
    projects,
    slug: block.blockType,
  };
}

export default ourWorkShowcase;
