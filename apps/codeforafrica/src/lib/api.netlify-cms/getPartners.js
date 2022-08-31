import { join } from "path";

import getCollectionData from "./getCollectionData";
import { setSeo } from "./seo";

const partnersDir = join(process.cwd(), "content/partners");

export default function getPartners(fields) {
  const partners = getCollectionData(partnersDir, fields);
  return partners.map(({ slug = null, name, ...other }) => {
    const href = slug ? `/about/partners/${slug}` : null;
    const seo = setSeo({
      title: name,
    });
    return { ...other, slug, href, name, seo };
  });
}
