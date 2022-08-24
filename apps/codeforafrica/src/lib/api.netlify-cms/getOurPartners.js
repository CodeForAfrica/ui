import { join } from "path";

import { marked } from "marked";

import getPartners from "./getPartners";
import { getCollectionBySlug } from "./utils";

const pageDir = join(process.cwd(), "content/pages");

export default function geOurPartners(page = "index") {
  const {
    "our-partners": {
      title: originalTitle,
      "partners-list": partnersIds,
      action = null,
    },
  } = getCollectionBySlug(pageDir, page, ["our-partners"]).items;
  const title = marked.parseInline(originalTitle);
  const allPartners = getPartners([
    "id",
    "slug",
    "name",
    "content",
    "href",
    "logo",
    "links",
  ]);
  // Need to maintain order of how partners were selected in ourPartners
  const list =
    page === "index"
      ? partnersIds?.map((id) => allPartners.find((p) => p.id === id)) ?? null
      : allPartners;

  return { title, list, action };
}
