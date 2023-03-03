import slug from "../fields/slug";

const Tags = {
  slug: "tag",
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      label: {
        en: "Name",
        fr: "Nom",
        pt: "Nome",
      },
      type: "text",
      localized: true,
      required: true,
    },
    slug({ fieldToUse: "name" }),
    {
      name: "collectionType",
      required: true,
      type: "select",
      options: [
        {
          label: {
            en: "News",
            fr: "Nouvelles",
            pt: "Notícias",
          },
          value: "news",
        },
        {
          label: {
            en: "Research",
            fr: "Recherche",
            pt: "Pesquisar",
          },
          value: "research",
        },
      ],
    },
  ],
};

export default Tags;
