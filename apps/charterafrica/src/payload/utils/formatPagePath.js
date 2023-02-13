/**
 * Use breadcrumbs for nested pages.
 */
function fullSlugFromBreadcrumbs({ breadcrumbs }) {
  const fullSlug =
    breadcrumbs && breadcrumbs[breadcrumbs.length - 1]?.url?.slice(1);
  return fullSlug;
}

function formatPagePath(collection, doc) {
  const { slug } = doc;
  let pageSlug = doc && fullSlugFromBreadcrumbs(doc);
  if (!pageSlug) {
    pageSlug = slug !== "index" ? slug : "";
  }
  let prefix = "";
  if (collection) {
    switch (collection) {
      case "pages":
        // Empty prefix for pages
        break;
      default:
        prefix = `/${collection}`;
    }
  }

  return `${prefix}/${pageSlug}`;
}

export default formatPagePath;
