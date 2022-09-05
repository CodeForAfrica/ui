import { getCollectionBySlug } from "./utils";

function getJoinUs() {
  const { "join-us": joinUs } = getCollectionBySlug(
    "content/pages",
    "contact-us-join-us",
    ["join-us"]
  ).data;

  return joinUs;
}

export default getJoinUs;
