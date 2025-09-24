import { linkGroup, richText } from "@commons-ui/payload";

const ComingSoon = {
  slug: "coming-soon",
  imageURL: "/images/cms/blocks/coming-soon.png",
  labels: {
    singular: "Coming Soon",
    plural: "Coming Soon",
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

export default ComingSoon;
