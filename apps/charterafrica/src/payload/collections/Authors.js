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
      label: {
        en: "Full Name",
        fr: "Nom et prénom",
        pt: "Nome completo",
      },
      localized: false,
      required: true,
    },
    // If more author information needed e.g contact details go here
  ],
};

export default Authors;
