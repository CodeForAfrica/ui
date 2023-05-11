import { array } from "payload/dist/fields/validations";

import { validateHexColor } from "../utils/colors";

const sortOptions = [
  "metadata_created desc",
  "metadata_created asc",
  "name asc",
  "name desc",
  "relevance desc",
  "relevance asc",
  "metadata_modified desc",
  "metadata_modified asc",
  "author asc",
  "author desc",
];

const Datasets = {
  slug: "datasets",
  fields: [
    {
      label: {
        en: "Sort Options",
        fr: "Options de tri",
        pt: "Opções de classificação",
      },
      type: "collapsible",
      fields: [
        {
          name: "sortOptions",
          type: "array",
          minRows: 1,
          label: {
            en: "Options",
            fr: "Options",
            pt: "Opções",
          },
          fields: [
            {
              name: "value",
              type: "select",
              options: sortOptions.map((value) => {
                return {
                  value,
                  label: value,
                };
              }),
              unique: true,
              required: true,
              validate: (val, options) => {
                const { data, t } = options || {};
                if (data?.options?.filter((l) => l.value === val)?.length > 1) {
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
          admin: {
            initCollapsed: true,
            components: {
              RowLabel: ({ data }) => {
                return data?.label || data?.value || data?.id;
              },
            },
          },
        },
      ],
    },
    {
      name: "labels",
      type: "group",
      label: {
        en: "Filter Labels",
        fr: "Étiquettes de filtre",
        pt: "Rótulos de filtro",
      },
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "search",
              type: "text",
              label: {
                en: "Search Label",
                fr: "Étiquette de recherche",
                pt: "Rótulo de pesquisa",
              },
              required: true,
              localized: true,
            },
            {
              name: "sort",
              type: "text",
              label: {
                en: "Sort Label",
                fr: "Étiquette de tri",
                pt: "Rótulo de classificação",
              },
              required: true,
              localized: true,
            },
            {
              name: "countries",
              type: "text",
              label: {
                en: "Countries Label",
                fr: "Étiquette des pays",
                pt: "Rótulo dos países",
              },
              required: true,
              localized: true,
            },
            {
              name: "tags",
              type: "text",
              label: {
                en: "Tags Label",
                fr: "Étiquette des tags",
                pt: "Rótulo das tags",
              },
              required: true,
              localized: true,
            },
          ],
        },
      ],
    },
    {
      name: "statistics",
      type: "group",
      label: {
        en: "Statistics",
        fr: "Statistiques",
        pt: "Estatísticas",
      },
      fields: [
        {
          name: "datasets",
          type: "group",
          label: {
            en: "Datasets",
            fr: "Jeux de données",
            pt: "Conjuntos de dados",
          },
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "label",
                  type: "text",
                  label: {
                    en: "Datasets Label",
                    fr: "Étiquette des jeux de données",
                    pt: "Rótulo dos conjuntos de dados",
                  },
                  required: true,
                  localized: true,
                },
                {
                  name: "count",
                  type: "number",
                  label: {
                    en: "Datasets Count",
                    fr: "Nombre de jeux de données",
                    pt: "Contagem de conjuntos de dados",
                  },
                  defaultValue: 1,
                  admin: {
                    readOnly: true,
                  },
                },
                {
                  name: "color",
                  type: "text",
                  label: {
                    en: "Datasets Colour",
                    fr: "Couleur des jeux de données",
                    pt: "Cor dos conjuntos de dados",
                  },
                  validate: validateHexColor,
                  required: true,
                },
              ],
            },
          ],
        },

        {
          name: "documents",
          type: "group",
          label: {
            en: "Documents",
            fr: "Documents",
            pt: "Documentos",
          },
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "label",
                  type: "text",
                  label: {
                    en: "Documents Label",
                    fr: "Étiquette des documents",
                    pt: "Rótulo dos documentos",
                  },
                  required: true,
                  localized: true,
                },
                {
                  name: "count",
                  type: "number",
                  label: {
                    en: "Documents Count",
                    fr: "Nombre de documents",
                    pt: "Contagem de documentos",
                  },
                  defaultValue: 1,
                  admin: {
                    readOnly: true,
                  },
                },
                {
                  name: "color",
                  type: "text",
                  label: {
                    en: "Datasets Colour",
                    fr: "Couleur des documents",
                    pt: "Cor dos documentos",
                  },
                  validate: validateHexColor,
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

export default Datasets;
