import CollectionOverview from "./CollectionOverview";

const ResourcesOverviewList = CollectionOverview(
  "resources-overview-list",
  "/images/cms/blocks/resources-overview-list.png",
  ["posts"],
  {
    collectionLabel: "Resources",
    hasAction: true,
  },
);

export default ResourcesOverviewList;
