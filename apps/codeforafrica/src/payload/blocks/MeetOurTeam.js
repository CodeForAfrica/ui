import image from "../fields/image";
import linkGroup from "../fields/links/linkGroup";
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
    linkGroup({ overrides: { name: "action", label: "Action" } }),
    image({
      overrides: {
        required: true,
      },
    }),
  ],
};

export default MeetOurTeam;