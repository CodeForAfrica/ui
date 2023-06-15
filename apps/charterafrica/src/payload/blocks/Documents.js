import { array } from "payload/dist/fields/validations";

import documentCloud from "../fields/documentCloud";
import filterBar from "../fields/filterBar";
import linkGroup from "../fields/linkGroup";
import defaultValue from "../utils/defaultValues";

const documentSortOptions = [
  "created_at",
  "score",
  "title",
  "page_count",
  "source",
];

const Documents = {
  slug: "documents",
  labels: {
    singular: {
      en: "Document",
      fr: "Document",
      pt: "Documento",
    },
    plural: {
      en: "Documents",
      fr: "Documents",
      pt: "Documentos",
    },
  },
  fields: [
    {
      type: "collapsible",
      label: {
        en: "Documents Source",
        fr: "Source des documents",
        pt: "Fonte de documentos",
      },
      fields: [
        documentCloud({
          name: "organization",
          label: {
            en: "Organization",
            fr: "Organisation",
            pt: "Organização",
          },
        }),
      ],
    },
    {
      type: "collapsible",
      label: {
        en: "Filter Bar",
        fr: "Barre de filtre",
        pt: "Barra de filtro",
      },
      fields: [
        filterBar({
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
                          data?.options?.filter((l) => l.value === val)
                            ?.length > 1
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
    },
    {
      type: "collapsible",
      label: {
        en: "Documents Labels",
        fr: "Étiquettes des documents",
        pt: "Rótulos de documentos",
      },
      fields: [
        {
          name: "labels",
          type: "group",
          label: {
            en: "Labels",
            fr: "Étiquettes",
            pt: "Rótulos",
          },
          admin: {
            hideGutter: true,
          },
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "pages",
                  label: {
                    en: "No of Pages Label",
                    fr: "Nombre de pages",
                    pt: "Número de páginas",
                  },
                  defaultValue: defaultValue({
                    en: "Pages",
                    fr: "Pages",
                    pt: "Páginas",
                  }),
                  type: "text",
                  required: true,
                  localized: true,
                },
                {
                  name: "contributedBy",
                  label: {
                    en: "Contributed By",
                    fr: "Contributed By",
                    pt: "Contributed By",
                  },
                  defaultValue: defaultValue({
                    en: "Contributed By",
                    fr: "Contributed By",
                    pt: "Contributed By",
                  }),
                  type: "text",
                  required: true,
                  localized: true,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "showDatasets",
      type: "checkbox",
      label: {
        en: "Show Datasets",
        fr: "Afficher les ensembles de données",
        pt: "Mostrar conjuntos de dados",
      },
      defaultValue: false,
    },
    linkGroup({
      linkConfig: { disableLabel: true },
      overrides: {
        name: "datasets",
        admin: {
          condition: (_, siblingData) => siblingData?.showDatasets,
          hideGutter: true,
        },
      },
    }),
  ],
};

export default Documents;
