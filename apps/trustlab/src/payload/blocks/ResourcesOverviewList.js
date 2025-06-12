import RelationshipOverview from "./RelationshipOverview";

const ResourcesOverviewList = RelationshipOverview(
  "resources-overview-list",
  "/images/cms/blocks/resources-overview-list.png",
  {
    relationTo: "resources",
    relationshipLabel: "Resources",
  },
);

export default ResourcesOverviewList;
