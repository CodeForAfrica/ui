import { deepmerge } from "@mui/utils";

import documentSelect from "./documents/documentSelect";

function documentCloudSource({ overrides } = {}) {
  const generatedDocumentCloudSource = {
    name: "documents",
    type: "group",
    label: {
      en: "Documents",
      fr: "Documents",
      pt: "Documentos",
    },
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        name: "groupId",
        type: "text",
        label: {
          en: "Group ID",
          fr: "ID de groupe",
          pt: "ID do grupo",
        },
        required: true,
      },
      {
        name: "options",
        type: "group",
        label: {
          en: "Options",
          fr: "Options",
          pt: "Opções",
        },
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
      {
        name: "showPinnedDocuments",
        type: "checkbox",
        label: {
          en: "Show Pinned Documents",
          fr: "Afficher les documents épinglés",
          pt: "Mostrar documentos fixados",
        },
        defaultValue: false,
        required: true,
      },
      documentSelect({
        name: "pinnedDocuments",
        label: {
          en: "Pinned Documents",
          fr: "Documents épinglés",
          pt: "Documentos fixados",
        },
        admin: {
          condition: (_, siblingData) => siblingData?.showPinnedDocuments,
        },
      }),
    ],
  };

  return deepmerge(generatedDocumentCloudSource, overrides);
}

export default documentCloudSource;
