import findAndFormatPagePath from "@/commons-ui/payload/utils/findAndFormatPagePath";

function nestCollectionUnderPage(pageSlug) {
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
      // Handle Errors
    }
    // TODO(kilemensi): Using `link` here is a bug since a given collection can
    //                  have a `link` field. This should be refactored in the
    //                  future.
    return { ...doc, link: { href } };
  };
}

export default nestCollectionUnderPage;
