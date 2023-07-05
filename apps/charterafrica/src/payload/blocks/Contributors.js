const Contributors = {
  slug: "our-contributors",
  labels: {
    singular: { en: "Contributors", fr: "Contributeurs", pt: "Colaboradores" },
    plural: { en: "Contributors", fr: "Contributeurs", pt: "Colaboradores" },
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
      defaultValue: ["sort", "location"],
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
          value: "location",
          label: {
            en: "Location",
            pt: "Localização",
            fr: "Emplacement",
          },
        },
      ],
    },
    {
      type: "text",
      label: {
        en: "Associated Tools Title",
        fr: "Titre des outils associés",
        pt: "Título das ferramentas associadas",
      },
      name: "toolsTitle",
      required: true,
      localized: true,
    },
  ],
};
export default Contributors;
