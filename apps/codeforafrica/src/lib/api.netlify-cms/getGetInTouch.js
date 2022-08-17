import { getCollectionBySlug } from "./utils";

export default function getGetInTouch() {
  return getCollectionBySlug("content/pages", "about", ["get-in-touch"]).items[
    "get-in-touch"
  ];
}
