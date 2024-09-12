import richText from "@/payload/fields/RichText";
import { Block } from "payload";

const OurMission: Block = {
  slug: "our-mission",
  imageURL: "/images/cms/blocks/codeforafrica/our_mission.jpg",
  imageAltText: "Our mission",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "subtitle",
      type: "text",
      required: true,
    },
    richText({
      name: "description",
      required: true,
    }),
  ],
};

export default OurMission;
