function fullSlugFromParents(doc) {
  const { slug, parent } = doc;
  if (!parent) {
    return slug;
  }
  return `${fullSlugFromParents(parent)}/${slug}`;
}

function fullSlugFromBreadcrumbs({ breadcrumbs } = {}) {
  const fullSlug = breadcrumbs?.[breadcrumbs.length - 1]?.url?.slice(1);
  return fullSlug;
}

function formatPagePath(collection, doc) {
  // If parent is populated as an object, traverse it directly — breadcrumbs may be stale
  // (e.g. saved before the parent relationship was set). An ID string or null means we
  // have no live parent data, so fall back to stored breadcrumbs.
  let pageSlug;
  if (doc.parent && typeof doc.parent === "object") {
    pageSlug = fullSlugFromParents(doc);
  } else {
    pageSlug = fullSlugFromBreadcrumbs(doc) || fullSlugFromParents(doc) || "";
  }
  if (pageSlug === "index") {
    pageSlug = "";
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
