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
      name: "subtitle",
      label: "Subtitle",
      required: true,
      type: "text",
    },
    {
      name: "messages",
      type: "array",
      label: "Messages",
      minRows: 1,
      fields: [
        {
          name: "message",
          type: "text",
        },
      ],
      admin: {
        className: "array-field-nested",
        components: {
          RowLabel: ({ data }) => {
            return data.message;
          },
        },
      },
    },
    image({
      overrides: {
        required: true,
      },
    }),
  ],
};

export default Hero;
