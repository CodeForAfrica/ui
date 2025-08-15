import CollectionOverview from "./CollectionOverview";

const Spotlight = CollectionOverview(
  "spotlight",
  "/images/cms/blocks/spotlight.png",
  ["posts"],
  {
    collectionLabel: "Spotlight Items",
    hasAction: false,
    minRows: 3,
    maxRows: 12,
  },
);

export default Spotlight;
