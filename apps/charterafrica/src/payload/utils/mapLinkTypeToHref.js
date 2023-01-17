import formatPagePath from "./formatPagePath";

const mapLinkTypeToHref = (link) => {
  let href;
  if (link.linkType === "internal") {
    const { relationTo: collection, value: doc } = link.doc;
    href = formatPagePath(collection, doc);
  } else {
    // custom link
    href = link.url;
  }
  return { ...link, href };
};

export default mapLinkTypeToHref;
