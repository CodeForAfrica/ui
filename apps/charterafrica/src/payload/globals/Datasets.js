import { validateHexColor } from "../utils/colors";

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
  ],
};

export default Datasets;
