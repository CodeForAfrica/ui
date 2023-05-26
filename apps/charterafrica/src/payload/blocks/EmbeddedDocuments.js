import richText from "../fields/richText";

const EmbeddedDocuments = {
  slug: "embedded-documents",
  fields: [
    {
      type: "collapsible",
      label: {
        en: "Title & Description",
        fr: "Titre & description",
        pt: "Titulo & descrição",
      },
      fields: [
        {
          name: "title",
          label: {
            en: "Title",
            fr: "Titre",
            pt: "Título",
          },
          type: "text",
          localized: true,
        },
        richText({
          name: "description",
          label: {
            en: "Description",
            fr: "La description",
            pt: "Descrição",
          },
          localized: true,
          admin: {
            elements: ["h3", "h4", "h5", "h6", "link", "ol", "ul", "indent"],
            leaves: ["bold", "code", "italic", "underline"],
          },
        }),
      ],
    },
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
          name: "documentGroup",
          label: {
            en: "Documents",
            fr: "Documents",
            pt: "Documentos",
          },
          type: "relationship",
          relationTo: "documentGroups",
          hasMany: false,
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
          admin: {
            hideGutter: true,
          },
        },
      ],
    },
  ],
};

export default EmbeddedDocuments;
