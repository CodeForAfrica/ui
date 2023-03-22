const Documents = {
  slug: "documents",
  admin: {
    useAsTitle: "groups",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "groups",
      label: {
        en: "Group Name",
        fr: "Nom de groupe",
        pt: "Nome do grupo",
      },
      type: "text",
      localized: true,
      required: true,
    },
    {
      name: "options",
      label: {
        en: "Options",
        fr: "Options",
        pt: "Opções",
      },
      type: "group",
      fields: [
        {
          name: "showNotes",
          label: {
            en: "Show Notes",
            fr: "Afficher les notes",
            pt: "Mostrar notas",
          },
          type: "checkbox",
          defaultValue: false,
          required: true,
        },
        {
          name: "showSearch",
          label: {
            en: "Show Search",
            fr: "Afficher la recherche",
            pt: "Mostrar pesquisa",
          },
          type: "checkbox",
          defaultValue: false,
          required: true,
        },
        {
          name: "showText",
          label: {
            en: "Show Text",
            fr: "Afficher le texte",
            pt: "Mostrar texto",
          },
          type: "checkbox",
          defaultValue: false,
          required: true,
        },
        {
          name: "showZoom",
          label: {
            en: "Show Zoom",
            fr: "Afficher le zoom",
            pt: "Mostrar zoom",
          },
          type: "checkbox",
          defaultValue: false,
          required: true,
        },
      ],
    },
  ],
};

export default Documents;
