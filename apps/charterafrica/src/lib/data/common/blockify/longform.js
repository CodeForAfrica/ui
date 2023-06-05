async function longform(block) {
  const { content: originalContent } = block;
  if (originalContent?.length) {
    const content = originalContent.map(({ blockType, ...other }) => ({
      ...other,
      slug: blockType,
    }));

    return {
      block: { ...block, content },
    };
  }
  return { block };
}

export default longform;
