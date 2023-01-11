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
      label: {
        en: "Category",
        fr: "Catégorie",
        pt: "Categoria",
      },
      required: true,
    },
    {
      name: "item",
      type: "group",
      label: {
        en: "Item",
        fr: "Objet",
        pt: "Item",
      },
      required: true,
      fields: [
        {
          name: "title",
          type: "text",
          label: {
            en: "Title",
            fr: "Titre",
            pt: "Título",
          },
          required: true,
        },
        {
          name: "image",
          label: {
            en: "Image",
            fr: "Image",
            pt: "Imagem",
          },
          type: "relationship",
          relationTo: "media",
          required: true,
        },
        {
          name: "topic",
          type: "text",
          label: {
            en: "Topic",
            fr: "Sujet",
            pt: "Tópico",
          },
          required: true,
        },
        {
          name: "excerpt",
          type: "text",
          label: {
            en: "Excerpt",
            fr: "Extrait",
            pt: "Excerto",
          },
          required: true,
        },
        {
          name: "date",
          type: "date",
          label: {
            en: "Date",
            fr: "Date",
            pt: "Encontro",
          },
          required: true,
          localized: true,
        },
        {
          name: "link",
          type: "text", // TODO: change to relationship to links
          label: {
            en: "Link",
            fr: "Lien",
            pt: "Ligação",
          },
          required: true,
        },
      ],
    },
  ],
};

export default Spotlight;
