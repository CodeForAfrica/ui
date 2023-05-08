import { array } from "payload/dist/fields/validations";

import { validateHexColor } from "../utils/colors";
import updateDatasetsStatistics from "../utils/datasets";

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
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "organizationId",
      label: {
        en: "Organization ID",
        fr: "ID de l'organisation",
        pt: "ID da organização",
      },
      type: "text",
      required: true,
      hooks: {
        afterChange: [updateDatasetsStatistics],
      },
    },
    {
      name: "charts",
      label: {
        en: "Charts",
        fr: "Graphiques",
        pt: "Gráficos",
      },
      type: "group",
      fields: [
        {
          name: "showCharts",
          label: {
            en: "Show charts",
            fr: "Afficher les graphiques",
            pt: "Mostrar gráficos",
          },
          type: "checkbox",
          defaultValue: true,
          required: true,
        },
        {
          name: "options",
          label: {
            en: "Charts options",
            fr: "Options des graphiques",
            pt: "Opções de gráficos",
          },
          type: "group",
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "datasetsLabel",
                  type: "text",
                  label: {
                    en: "Datasets label",
                    fr: "Étiquette des jeux de données",
                    pt: "Rótulo dos conjuntos de dados",
                  },
                  required: true,
                  localized: true,
                  admin: {
                    width: "33.3%",
                  },
                },
                {
                  name: "datasetsColor",
                  type: "text",
                  validate: validateHexColor,
                  required: true,
                  label: {
                    en: "Datasets color",
                    fr: "Couleur des jeux de données",
                    pt: "Cor dos conjuntos de dados",
                  },
                  admin: {
                    width: "33.3%",
                  },
                },
                {
                  name: "datasetsCount",
                  type: "number",
                  label: {
                    en: "Datasets count",
                    fr: "Nombre de jeux de données",
                    pt: "Contagem de conjuntos de dados",
                  },
                  admin: {
                    width: "33.3%",
                    readOnly: true,
                  },
                },
              ],
            },
            {
              type: "row",
              fields: [
                {
                  name: "documentsLabel",
                  type: "text",
                  label: {
                    en: "Documents label",
                    fr: "Étiquette des documents",
                    pt: "Rótulo dos documentos",
                  },
                  required: true,
                  localized: true,
                  admin: {
                    width: "33.3%",
                  },
                },
                {
                  name: "documentsColor",
                  type: "text",
                  validate: validateHexColor,
                  required: true,
                  label: {
                    en: "Documents color",
                    fr: "Couleur des documents",
                    pt: "Cor dos documentos",
                  },
                  admin: {
                    width: "33.3%",
                  },
                },
                {
                  name: "documentsCount",
                  type: "number",
                  label: {
                    en: "Documents count",
                    fr: "Nombre de documents",
                    pt: "Contagem de documentos",
                  },
                  admin: {
                    width: "33.3%",
                    readOnly: true,
                  },
                },
              ],
            },
          ],
          admin: {
            condition: (_, siblingData) => siblingData?.showCharts,
          },
        },
      ],
    },
    {
      label: {
        en: "Sort Options",
        fr: "Options de tri",
        pt: "Opções de classificação",
      },
      type: "collapsible",
      fields: [
        {
          name: "options",
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
  ],
};

export default Datasets;
