import image from "@/payload/fields/image";
import { Block } from "payload";

const CustomPageHeader: Block  = {
  slug: "custom-page-header",
  imageURL: "/images/cms/blocks//codeforafrica/custom_page_header.jpg",
  imageAltText: "Used in about page.",
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
    image({
      overrides: {
        required: true,
      },
    }),
  ],
};

export default CustomPageHeader;
