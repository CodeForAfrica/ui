function formatPagePath(collection, doc) {
  const { slug } = doc;
  const pageSlug = slug !== "index" ? slug : "";
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
