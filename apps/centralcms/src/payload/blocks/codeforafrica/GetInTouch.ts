import linkGroup from "@/payload/fields/links/linkGroup";
import { Block } from "payload";

const GetInTouch: Block = {
  slug: "get-in-touch",
  imageURL: "/images/cms/blocks/codeforafrica/get_in_touch.jpg",
  imageAltText: "Display Get In Touch Call to Action",
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
    linkGroup({ overrides: { name: "action", label: "Action" } }),
  ],
};

export default GetInTouch;
