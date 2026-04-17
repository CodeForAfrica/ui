import formatPagePath from "@/commons-ui/payload/utils/formatPagePath";

/**
 * Appends a `pathname` to a `page` item based on its slug and the slug of any
 * parent pages.
 *
 * The `pathname` can then be used as URL for the page item in the frontend.
 *
 * @returns
 */
async function appendPathname({ doc }) {
  if (doc) {
    const pathname = formatPagePath("pages", doc);
    if (pathname) {
      return { ...doc, pathname };
    }
  }
  return doc;
}

export default appendPathname;
