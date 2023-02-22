const Authors = {
  slug: "author",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: {
        en: "Name",
        fr: "Nom",
        pt: "Nome",
      },
      localized: false,
      required: true,
    },
    // If more author information needed e.g contact details go here
  ],
};

export default Authors;
