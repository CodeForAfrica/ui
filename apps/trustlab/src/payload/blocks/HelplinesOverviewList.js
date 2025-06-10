import RelationshipOverview from "./RelationshipOverview";

const HelplinesOverviewList = RelationshipOverview(
  "helplines-overview-list",
  "/images/cms/blocks/helpline-overview-list.png",
  {
    fields: [
      {
        name: "isHelplines",
        type: "checkbox",
        defaultValue: true,
        virtual: true,
        admin: {
          hidden: true,
        },
      },
    ],
    relationTo: "helplines",
    relationshipLabel: "Helplines",
    linkLabelDefaultValue: "Get Support",
  },
);

export default HelplinesOverviewList;
