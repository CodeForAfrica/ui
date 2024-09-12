interface BreadCrumbs {
  doc: string;
  url: string;
  label: string;
  id: string;
}
interface Doc {
  slug: string;
  parent?: Doc;
  breadcrumbs: BreadCrumbs[];
}
function fullSlugFromParents(doc: Doc): string {
  const { slug, parent } = doc;
  if (!parent) {
    return slug;
  }
  return `${fullSlugFromParents(parent)}/${slug}`;
}

function fullSlugFromBreadcrumbs(doc: Doc) {
  const fullSlug =
    doc?.breadcrumbs?.[doc?.breadcrumbs.length - 1]?.url?.slice(1);
  return fullSlug;
}

function formatPagePath(collection: string, doc: Doc) {
  let pageSlug = fullSlugFromBreadcrumbs(doc) || fullSlugFromParents(doc) || "";
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
