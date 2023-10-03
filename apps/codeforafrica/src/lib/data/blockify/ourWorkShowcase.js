async function ourWorkShowcase(block, api) {
  const { docs: projects } = await api.getCollection("projects");
  const projectTags = projects.map(({ tag }) => tag).filter(Boolean);
  const tags = Array.from(new Set(projectTags.map((item) => item.id))).map(
    (id) => {
      return projectTags.find((item) => item.id === id);
    },
  );

  return {
    tags,
    ...block,
    projects,
    slug: block.blockType,
  };
}

export default ourWorkShowcase;
