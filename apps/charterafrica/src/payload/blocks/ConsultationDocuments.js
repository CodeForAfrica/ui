import richText from "../fields/richText";

const ConsultationDocuments = {
  slug: "consultation-documents",
  fields: [
    richText({
      name: "description",
      label: {
        en: "Description",
        fr: "Description",
        pt: "Descrição",
      },
      required: true,
      localized: true,
      admin: {
        elements: [],
        leaves: ["bold", "italic", "underline"],
      },
    }),
    {
      name: "documents",
      label: {
        en: "Documents Group",
        fr: "Groupe de documents",
        pt: "Grupo de documentos",
      },
      type: "group",
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
    },
  ],
};

export default ConsultationDocuments;
