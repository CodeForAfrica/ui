import richText from "@/payload/fields/RichText";
import { Block } from "payload";


const Error: Block  = {
  slug: "error",
  imageURL: "/images/cms/blocks/codeforafrica/error.png",
  imageAltText: "Used to describe errors in error pages.",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    richText({
      name: "subtitle",
    }),
  ],
};

export default Error;
