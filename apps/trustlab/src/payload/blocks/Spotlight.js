import RelationshipOverview from "./RelationshipOverview";

const Spotlight = RelationshipOverview(
  "spotlight",
  "/images/cms/blocks/spotlight.png",
  {
    relationTo: ["helplines", "posts", "resources"],
    relationshipLabel: "Spotlight Items",
    hasLinkButton: false,
    minRows: 2,
    maxRows: 2,
  },
);

export default Spotlight;
