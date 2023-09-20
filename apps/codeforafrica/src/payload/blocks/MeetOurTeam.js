import image from "../fields/image";
import link from "../fields/links/link";
import richText from "../fields/richText";

const MeetOurTeam = {
  slug: "meet-our-team",
  imageURL: "/images/cms/blocks/meet_our_team.jpg",
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
      name: "action",
      label: "Action Button",
      type: "group",
      fields: [link()],
    },
    image({
      overrides: {
        required: true,
      },
    }),
  ],
};

export default MeetOurTeam;
