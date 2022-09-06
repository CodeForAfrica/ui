import { getCollectionBySlug } from "./utils";

export default function getGetInTouch() {
  const getInTouch = getCollectionBySlug("content/pages", "about", [
    "get-in-touch",
  ]).items["get-in-touch"];

  return { ...getInTouch, slug: "get-in-touch" };
}
