import CollectionOverview from "./CollectionOverview";

const Spotlight = CollectionOverview(
  "spotlight",
  "/images/cms/blocks/spotlight.png",
  ["helplines", "posts", "resources"],
  {
    collectionLabel: "Spotlight Items",
    hasLinkButton: false,
    minRows: 2,
    maxRows: 2,
  },
);

export default Spotlight;
