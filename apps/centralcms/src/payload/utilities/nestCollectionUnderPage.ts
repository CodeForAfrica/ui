import findAndFormatPagePath from "./findAndFormatPagePath";

function nestCollectionUnderPage(pageSlug) {
  return async function nestCollectionItemUnderParentPage({
    doc,
    req: { payload },
  }) {
    let href: string | null = null;
    try {
      const pagePath = await findAndFormatPagePath(payload, pageSlug);
      if (pagePath) {
        href = `${pagePath}/${doc.slug}`;
      }
    } catch (error) {
      // Handle Errors
    }
    return { ...doc, link: { href } };
  };
}

export default nestCollectionUnderPage;
