async function processPagePrivacyPolicy(page) {
  const { blocks } = page;
  const index = blocks?.findIndex(({ slug }) => slug === "longform");
  if (index > -1) {
    const { content: originalContent } = blocks[index];
    if (originalContent?.length) {
      const content = originalContent.map(({ blockType, ...other }) => ({
        ...other,
        slug: blockType,
      }));
      blocks[index].content = content;
    }
  }
  return page;
}

export default processPagePrivacyPolicy;
