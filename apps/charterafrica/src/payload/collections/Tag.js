const Tag = {
  slug: "tag",
  admin: {
    useAsTitle: "tagName",
  },
  fields: [
    {
      name: "tagName",
      label: {
        en: "Tag Name",
        fr: "Nom de la balise",
        pt: "Nome da etiqueta",
      },
      type: "text",
      localized: true,
      required: true,
    },
  ],
};

export default Tag;
