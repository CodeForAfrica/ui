const Spotlight = {
  slug: "spotlight",
  access: {
    read: () => true,
  },
  admin: {
    group: "Blocks",
    useAsTitle: "category",
  },
  fields: [
    {
      name: "category",
      type: "text",
      required: true,
    },
    {
      name: "item",
      type: "group",
      required: true,
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "image",
          label: "Image",
          type: "relationship",
          relationTo: "media",
          required: true,
        },
        {
          name: "topic",
          type: "text",
          required: true,
        },
        {
          name: "excerpt",
          type: "text",
          required: true,
        },
        {
          name: "date",
          type: "date",
          required: true,
        },
        {
          name: "link",
          type: "text", // TODO: change to relationship to links
          required: true,
        },
      ],
    },
  ],
};

export default Spotlight;
