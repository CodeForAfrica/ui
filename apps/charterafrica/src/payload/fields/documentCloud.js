import { deepmerge } from "@mui/utils";
import { array } from "payload/dist/fields/validations";

import defaultValue from "../utils/defaultValues";

import filterBar from "./filterBar";

const documentSortOptions = [
  "created_at",
  "score",
  "title",
  "page_count",
  "source",
];

const documentCloud = (overrides = {}) => {
  const basicDocument = {
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
      {
        name: "showFilterBar",
        label: {
          en: "Show Filter Bar",
          fr: "Afficher la barre de filtre",
          pt: "Mostrar barra de filtro",
        },
        type: "checkbox",
        defaultValue: false,
      },
      filterBar({
        admin: {
          hideGutter: true,
          condition: (_, siblingData) => siblingData.showFilterBar,
        },
        fields: [
          {
            name: "search",
            type: "group",
            admin: {
              hideGutter: true,
            },
            fields: [
              {
                name: "label",
                type: "text",
                label: {
                  en: "Search Label",
                  fr: "Étiquette de recherche",
                  pt: "Rótulo de pesquisa",
                },
                defaultValue: defaultValue({
                  en: "Search",
                  fr: "Rechercher",
                  pt: "Pesquisar",
                }),
                required: true,
                localized: true,
              },
            ],
          },
          {
            name: "sort",
            type: "group",
            admin: {
              hideGutter: true,
              style: {
                marginTop: 10,
              },
            },
            fields: [
              {
                name: "label",
                type: "text",
                label: {
                  en: "Sort Label",
                  fr: "Étiquette de tri",
                  pt: "Rótulo de classificação",
                },
                defaultValue: defaultValue({
                  en: "Sort",
                  fr: "Trier",
                  pt: "Classificar",
                }),
                required: true,
                localized: true,
              },
              {
                name: "options",
                type: "array",
                minRows: 1,
                label: {
                  en: "Sort Options",
                  fr: "Options de tri",
                  pt: "Opções de classificação",
                },
                fields: [
                  {
                    name: "value",
                    type: "select",
                    unique: true,
                    required: true,
                    options: documentSortOptions,
                    validate: (val, options) => {
                      const { data, t } = options || {};
                      if (
                        data?.options?.filter((l) => l.value === val)?.length >
                        1
                      ) {
                        return t("charterafrica.site:uniqueSortOptions");
                      }
                      return array(val, options);
                    },
                  },
                  {
                    name: "label",
                    type: "text",
                    label: {
                      en: "Label",
                      fr: "Étiquette",
                      pt: "Rótulo",
                    },
                    required: true,
                  },
                ],
              },
            ],
          },
        ],
      }),
    ],
  };

  return deepmerge(basicDocument, overrides);
};

export default documentCloud;
