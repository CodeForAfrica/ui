import { getCollectionBySlug } from "./utils";

const FIELD_NAME = "news-stories";

function getNewsAndStories(page) {
  const {
    "articles-count": count,
    title,
    slug,
  } = getCollectionBySlug("content/pages", page, [FIELD_NAME, "slug"]).items[
    FIELD_NAME
  ];

  return { count, title, slug };
}

export default getNewsAndStories;
