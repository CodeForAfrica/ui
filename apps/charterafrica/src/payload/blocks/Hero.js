const Hero = {
  slug: "hero",
  access: {
    read: () => true,
  },
  admin: {
    group: "Blocks",
    useAsTitle: "title",
    defaultColumns: ["title", "updatedAt"],
  },
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
    {
      name: "buttons",
      type: "array",
      minRows: 1,
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
        {
          name: "link",
          type: "text",
          required: true,
        },
      ],
    },
  ],
};

export default Hero;
