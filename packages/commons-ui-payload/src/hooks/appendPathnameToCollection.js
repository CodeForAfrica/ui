import findAndFormatPagePath from "@/commons-ui/payload/utils/findAndFormatPagePath";

/**
 * Append `pathname` to a collection item by finding the parent `page` and
 * nesting the collection item under it. This is useful for non-`page`
 * collections that are meant to be nested under a page e.g.
 * `/articles/article-slug` where `articles` is a page and `article-slug` is
 * a collection (e.g. post) item.
 *
 * The `pathname` can then be used to as URL for the collection item in the
 * frontend.
 *
 * @param {string | object} page - The slug of, or the parent page under which the
 *   collection items should be nested.
 * @returns {function} A function that takes a collection item and appends the
 *   `pathname` to it.
 */
function appendPathnameToCollection(page) {
  return async function appendPathnameToCollectionItem({ doc, req }) {
    // if page is an object, `payload` won't be needed to find the page.
    let pathname = `/${doc.slug}`;
    const { payload } = req || {};
    try {
      const pagePathname = await findAndFormatPagePath(payload, page);
      if (pagePathname) {
        pathname = `${pagePathname}${pathname}`;
      }
    } catch (error) {
      // Log error? This is a library though so maybe not.
    }
    return { ...doc, pathname };
  };
}

export default appendPathnameToCollection;
