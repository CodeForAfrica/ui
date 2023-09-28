const Authors = {
  slug: "author",
  access: {
    read: () => true,
  },
  admin: {
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
      required: true,
    },
  ],
};

export default Authors;
