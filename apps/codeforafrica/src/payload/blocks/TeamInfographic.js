import image from "../fields/image";
import link from "../fields/links/link";
import richText from "../fields/richText";

const TeamInfographic = {
  slug: "team-infographic",
  imageURL: "/images/cms/blocks/team_infographic.jpg",
  imageAltText: "Display Team Infographic",
  fields: [
    {
      name: "title",
      label: "Title",
      required: true,
      type: "text",
    },
    richText({
      name: "description",
      label: "Description",
      required: true,
    }),
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
    image({
      overrides: {
        required: true,
      },
    }),
  ],
};

export default TeamInfographic;
