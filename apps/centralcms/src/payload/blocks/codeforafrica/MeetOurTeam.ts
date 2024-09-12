import image from "@/payload/fields/image";
import linkGroup from "@/payload/fields/links/linkGroup";
import richText from "@/payload/fields/RichText";
import { Block } from "payload";

const MeetOurTeam: Block = {
  slug: "meet-our-team",
  imageURL: "/images/cms/blocks/codeforafrica/meet_our_team.jpg",
  imageAltText: "Display Team Call to Action",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    richText({
      name: "description",
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
