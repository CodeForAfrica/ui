const ConsultationDocuments = {
  slug: "consultation-documents",
  fields: [
    {
      name: "group",
      label: {
        en: "Documents Group",
        fr: "Groupe de documents",
        pt: "Grupo de documentos",
      },
      type: "group",
      fields: [
        {
          name: "group",
          label: {
            en: "Documents  Group Name",
            fr: "Nom du groupe de documents",
            pt: "Nome do grupo de documentos",
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
              type: "row",
              fields: [
                {
                  name: "showNotes",
                  label: {
                    en: "Show Notes",
                    fr: "Afficher les notes",
                    pt: "Mostrar notas",
                  },
                  type: "checkbox",
                  defaultValue: true,
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
        },
      ],
    },
  ],
};

export default ConsultationDocuments;
