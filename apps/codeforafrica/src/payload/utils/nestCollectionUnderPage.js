import findAndFormatPagePath from "./findAndFormatPagePath";

function nestCollectionUnderPage(pageSlug) {
  return async function nestCollectionItemUnderParentPage({
    req: { payload },
    data: { slug },
  }) {
    let href = null;
    try {
      const pagePath = await findAndFormatPagePath(payload, pageSlug);
      if (pagePath) {
        href = `${pagePath}/${slug}`;
      }
    } catch (error) {
      // Handle Errors
    }
    return href;
  };
}

export default nestCollectionUnderPage;
