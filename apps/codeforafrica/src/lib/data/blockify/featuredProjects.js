import { sortTags } from "@/codeforafrica/lib/data/utils/posts";

async function ourWorkShowcase(block) {
  const { projects } = block;
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
