import { richText, image, link } from "@commons-ui/payload";

const CallToAction = {
  slug: "call-to-action",
  labels: {
    singular: "Call to Action",
    plural: "Calls to Action",
  },
  imageURL: "/images/cms/blocks/call-to-action.png",
  imageAltText: "Showcases images and content.",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
      admin: {},
    },
    richText({
      name: "description",
      required: true,
      admin: {
        description: "A brief description of the content.",
      },
    }),
    {
      name: "reverse",
      type: "checkbox",
      label: { en: "Reverse Layout" },
      defaultValue: false,
      admin: {
        description:
          "If enabled, the layout of the showcase block will be reversed. This is used to determine the layout of the showcase block.",
      },
    },
    link({
      name: "action",
      label: "Action Link",
      required: true,
    }),
    {
      name: "images",
      type: "array",
      label: { en: "Images" },
      minRows: 4,
      maxRows: 4,
      fields: [
        image({
          overrides: {
            name: "image",
            required: true,
            admin: {
              description: "Image to display in the showcase block.",
            },
          },
        }),
      ],
    },
  ],
};

export default CallToAction;
