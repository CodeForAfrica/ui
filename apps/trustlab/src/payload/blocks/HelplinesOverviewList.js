import CollectionOverview from "./CollectionOverview";

const HelplinesOverviewList = CollectionOverview(
  "helplines-overview-list",
  "/images/cms/blocks/helpline-overview-list.png",
  ["posts"],
  {
    collectionLabel: "Helplines",
    linkLabelDefaultValue: "Get Support",
  },
);

export default HelplinesOverviewList;
