import richText from "../fields/richText";

const Hero = {
  slug: "hero",
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
        components: {
          RowLabel: ({ data }) => {
            return data.message;
          },
        },
      },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
      label: "Image",
    },
  ],
};

export default Hero;
