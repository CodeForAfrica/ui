import { sortTags } from "@/codeforafrica/lib/data/utils/tags";

async function featuredWork(block) {
  const { projects } = block;
  const projectTags = projects.map(({ tag }) => tag).filter(Boolean);
  const tags = sortTags(projectTags);

  return {
    ...block,
    tags,
    slug: block.blockType,
  };
}

export default featuredWork;
