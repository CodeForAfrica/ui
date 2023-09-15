import image from "../fields/image";
import link from "../fields/links/link";
import richText from "../fields/richText";

const MeetOurTeam = {
  slug: "meet-our-team",
  imageURL: "/images/cms/blocks/team_infographic.jpg",
  imageAltText: "Display Team Call to Action",
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

export default MeetOurTeam;
