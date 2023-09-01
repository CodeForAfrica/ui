import findAndFormatPagePath from "./findAndFormatPagePath";

function nestCollectionUnderPage(pageSlug) {
  // TODO(kilemensi): Think of a way of nesting title and breadcrumbs as well
  //                  i.e. full SEO
  return async function nestCollectionItemUnderParentPage({
    doc,
    req: { payload },
  }) {
    let href = null;
    try {
      const pagePath = await findAndFormatPagePath(payload, pageSlug);
      if (pagePath) {
        href = `${pagePath}/${doc.slug}`;
      }
    } catch (error) {
      // TODO(kilemensi): Add Sentry to payload & report errors
    }
    return { ...doc, link: { href } };
  };
}

export default nestCollectionUnderPage;
