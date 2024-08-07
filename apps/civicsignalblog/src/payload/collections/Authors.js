const Authors = {
  slug: "author",
  access: {
    read: () => true,
  },
  admin: {
    defaultColumns: ["fullName", "updatedAt"],
    enableRichTextLink: false,
    group: "Publication",
    useAsTitle: "fullName",
  },
  fields: [
    {
      name: "fullName",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "bio",
      type: "textarea",
      localized: true,
    },
  ],
};

export default Authors;
