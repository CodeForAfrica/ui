import { linkGroup, richText } from "@commons-ui/payload";

const Error = {
  slug: "error",
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
      name: "statusCode",
      type: "number",
      required: true,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: false,
    },
    {
      name: "form",
      type: "relationship",
      relationTo: "forms",
      required: false,
    },
    // button link
    linkGroup({ name: "homeButton" }),
  ],
};

export default Error;
