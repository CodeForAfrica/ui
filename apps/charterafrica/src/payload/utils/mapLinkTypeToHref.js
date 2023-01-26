import formatPagePath from "./formatPagePath";

const mapLinkTypeToHref = ({ doc: linkDoc, linkType, url }) => {
  // default to `null` for serialization.
  let href = null;
  if (linkType === "internal") {
    const { relationTo: collection, value: doc } = linkDoc;
    if (doc?.slug) {
      href = formatPagePath(collection, doc);
    }
  } else {
    // custom link
    href = url;
  }
  return href;
};

export default mapLinkTypeToHref;
