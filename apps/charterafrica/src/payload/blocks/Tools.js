const Tools = {
  slug: "our-tools",
  labels: {
    singular: { en: "Tool", fr: "Outil", pt: "Ferramenta" },
    plural: { en: "Tools", fr: "Outils", pt: "Ferramentas" },
  },
  fields: [
    {
      type: "text",
      label: { en: "Title", fr: "Titre", pt: "Título" },
      name: "title",
      required: true,
      localized: true,
    },
    {
      type: "select",
      name: "filters",
      label: { en: "Filters", fr: "Filtres", pt: "Filtros" },
      defaultValue: ["sort", "theme", "location"],
      hasMany: true,
      options: [
        {
          value: "sort",
          label: {
            en: "Sort",
            pt: "Ordenar",
            fr: "Trier",
          },
        },
        {
          value: "theme",
          label: {
            en: "Theme",
            pt: "Tema",
            fr: "Thème",
          },
        },
        {
          value: "stars",
          label: {
            en: "Stars",
            pt: "Estrelas",
            fr: "Étoiles",
          },
        },
        {
          value: "location",
          label: {
            en: "Location",
            pt: "Localização",
            fr: "Emplacement",
          },
        },
        {
          value: "classification",
          label: {
            en: "Classification",
            fr: "Classification",
            pt: "Classificação",
          },
        },
      ],
    },
  ],
};
export default Tools;
