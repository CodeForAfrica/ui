import { getCollectionBySlug } from "./utils";

function getBody(page) {
  const { content } = getCollectionBySlug("content/pages", page, [
    "content",
  ]).items;

  return { content };
}

export default getBody;
