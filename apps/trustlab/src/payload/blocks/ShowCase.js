import { richText, image, link } from "@commons-ui/payload";

const ShowCase = {
  slug: "showcase",
  labels: {
    singular: "Showcase Block",
    plural: "Showcase Blocks",
  },
  imageURL: "/images/cms/blocks/showcase.png",
  imageAltText: "Showcases images and content.",
  fields: [
    richText({
      name: "title",
      required: true,
    }),
    richText({
      name: "description",
      required: true,
      admin: {
        description: "A brief description of the slide content.",
      },
    }),
    {
      name: "direction",
      type: "select",
      options: [
        { label: "Left to Right", value: "ltr" },
        { label: "Right to Left", value: "rtl" },
      ],
      defaultValue: "ltr",
      admin: {
        description:
          "Direction of images -> content card the showcase block. This is used to determine the layout of the showcase block.",
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

export default ShowCase;
