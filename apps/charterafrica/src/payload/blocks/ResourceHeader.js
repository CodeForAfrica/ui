const ResourceHeader = {
  slug: "resource-header",
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
      localized: true,
    },
    {
      name: "resourceType",
      type: "select",
      label: {
        en: "Chart Resource Type",
        fr: "Type de ressource de graphique",
        pt: "Tipo de recurso de gráfico",
      },
      options: [
        {
          value: "dataset",
          label: {
            en: "Dataset",
            fr: "Jeu de données",
            pt: "Conjunto de dados",
          },
        },
        {
          value: "Ecosystem",
          label: {
            en: "Ecosystem",
            fr: "Écosystème",
            pt: "Ecossistema",
          },
        },
        {
          value: "tool",
          label: {
            en: "Tool",
            fr: "Outil",
            pt: "Ferramenta",
          },
        },
      ],
    },
  ],
};

export default ResourceHeader;
