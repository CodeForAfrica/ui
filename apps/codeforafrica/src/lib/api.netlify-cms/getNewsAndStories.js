import { getCollectionBySlug } from "./utils";

const FIELD_NAME = "news-stories";

function getNewsAndStories(page) {
  const { "articles-count": count, title } = getCollectionBySlug(
    "content/pages",
    page,
    [FIELD_NAME]
  ).items[FIELD_NAME];

  return { count, title };
}

export default getNewsAndStories;
