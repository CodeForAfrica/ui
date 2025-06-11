import RelationshipOverview from "./RelationshipOverview";

const HelplinesOverviewList = RelationshipOverview(
  "helplines-overview-list",
  "/images/cms/blocks/helpline-overview-list.png",
  {
    relationTo: "helplines",
    relationshipLabel: "Helplines",
    linkLabelDefaultValue: "Get Support",
  },
);

export default HelplinesOverviewList;
