import link from "../fields/links/link";

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
      label: "Sub Title",
      required: true,
      type: "text",
    },
    {
      name: "actionButton",
      label: "Action Button",
      type: "group",
      fields: [
        {
          name: "label",
          label: "Label",
          type: "text",
          required: true,
        },
        link({}),
      ],
    },
  ],
};

export default JoinOurSlack;
