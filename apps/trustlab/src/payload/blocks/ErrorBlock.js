import { linkGroup, richText } from "@commons-ui/payload";

const ErrorBlock = {
  slug: "error",
  imageURL: "/images/cms/blocks/error.png",
  labels: {
    singular: "Error",
    plural: "Errors",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    richText({
      name: "subtitle",
      label: "Subtitle",
      required: true,
    }),
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: false,
    },
    // button link
    linkGroup({ name: "homeButton" }),
  ],
};

export default ErrorBlock;
