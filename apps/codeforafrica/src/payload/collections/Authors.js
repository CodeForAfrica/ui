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
      label: "Full Name",
      localized: false,
      required: true,
    },
    {
      name: "bio",
      type: "textarea",
      label: "Bio",
    },
  ],
};

export default Authors;
