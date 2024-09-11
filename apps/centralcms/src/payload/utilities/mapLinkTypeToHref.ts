import formatPagePath from "./formatPagePath";

export interface NodeType {
  type: string;
  children?: NodeType[] | null;
  doc: any;
  linkType?: "custom" | "internal";
  url?: string;
  href?: string;
}

const mapLinkTypeToHref = ({
  doc: linkDoc,
  linkType,
  url,
}: NodeType): string | null | undefined => {
  // default to `null` for serialization.
  let href : string | null | undefined = null;
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
