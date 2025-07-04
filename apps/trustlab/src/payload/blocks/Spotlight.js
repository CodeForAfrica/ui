import CollectionOverview from "./CollectionOverview";

const Spotlight = CollectionOverview(
  "spotlight",
  "/images/cms/blocks/spotlight.png",
  ["posts"],
  {
    collectionLabel: "Spotlight Items",
    hasAction: false,
    minRows: 2,
    maxRows: 2,
  },
);

export default Spotlight;
