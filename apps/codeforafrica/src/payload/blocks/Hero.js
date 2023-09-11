import image from "../fields/image";
import richText from "../fields/richText";

const Hero = {
  slug: "hero",
  imageURL: "/images/cms/blocks/hero.jpg",
  imageAltText: "Used in homepage.",
  fields: [
    richText({
      name: "title",
      label: "Title",
      required: true,
      admin: {
        elements: [],
        leaves: ["bold"],
      },
    }),
    {
      name: "messages",
      type: "array",
      label: "Messages",
      minRows: 3,
      maxRows: 3,
      fields: [
        {
          name: "message",
          type: "text",
        },
      ],
      admin: {
        className: "array-field-nested",
        components: {
          RowLabel: ({ data, index }) => {
            return data?.message || `Message ${String(index).padStart(2, "0")}`;
          },
        },
      },
    },
    {
      name: "subtitle",
      label: "Description",
      required: true,
      type: "text",
    },
    image({
      overrides: {
        required: true,
      },
    }),
  ],
};

export default Hero;
