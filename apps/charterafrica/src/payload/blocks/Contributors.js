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
        {
          value: "classification",
          label: {
            en: "Collection",
            fr: "Collection",
            pt: "Coleção",
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
    {
      type: "text",
      label: {
        en: "Repositories Title",
        fr: "Titre des dépôts",
        pt: "Título dos repositórios",
      },
      name: "repositoriesTitle",
      required: true,
      localized: true,
    },
    {
      type: "text",
      label: {
        en: "Organisations Title",
        fr: "Titre des organisations",
        pt: "Título das organizações",
      },
      name: "organisationsTitle",
      required: true,
      localized: true,
    },
  ],
};
export default Contributors;
