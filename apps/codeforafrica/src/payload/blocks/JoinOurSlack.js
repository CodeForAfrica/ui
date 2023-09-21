import linkGroup from "../fields/links/linkGroup";

const JoinOurSlack = {
  slug: "join-our-slack",
  imageURL: "/images/cms/blocks/join_our_slack.jpg",
  imageAltText: "Display link to join our Slack community",
  fields: [
    {
      name: "title",
      label: "Title",
      required: true,
      type: "text",
    },
    {
      name: "subtitle",
      label: "Subtitle",
      required: true,
      type: "text",
    },
    linkGroup({ overrides: { name: "action", label: "Action" } }),
  ],
};

export default JoinOurSlack;
