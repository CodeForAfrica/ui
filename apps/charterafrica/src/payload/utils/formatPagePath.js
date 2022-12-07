function formatPagePath(collection, doc) {
  const { slug } = doc;

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

  return `${prefix}/${slug}`;
}

export default formatPagePath;
