import { join } from "path";

import { marked } from "marked";

import getPartners from "./getPartners";
import { getCollectionBySlug } from "./utils";

const pageDir = join(process.cwd(), "content/pages");

export default function geOurPartners(page = "index") {
  const { "our-partners": ourPartners } = getCollectionBySlug(pageDir, page, [
    "our-partners",
  ]).items;
  ourPartners.title = marked.parseInline(ourPartners.title);
  const allPartners = getPartners([
    "id",
    "slug",
    "name",
    "content",
    "href",
    "logo",
  ]);
  // Need to maintain order of how partners were selected in ourPartners
  ourPartners.list =
    ourPartners.list?.map((id) => allPartners.find((p) => p.id === id)) ?? null;

  return ourPartners;
}
