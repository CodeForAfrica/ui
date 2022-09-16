import { join } from "path";

import getPartners from "./getPartners";
import { getCollectionBySlug } from "./utils";

import marked from "@/codeforafrica/lib/marked";

const pageDir = join(process.cwd(), "content/pages");
const FIELD_NAME = "our-partners";

export default function geOurPartners(page = "index") {
  const {
    "our-partners": {
      slug,
      title: originalTitle,
      "partners-list": partnersIds,
      action = null,
    },
  } = getCollectionBySlug(pageDir, page, [FIELD_NAME, "slug"]).items;
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

  return { slug, partners: { title, list, action } };
}
