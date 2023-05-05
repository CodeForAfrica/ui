import { validateHexColor } from "../utils/colors";
import updateDatasetsStatistics from "../utils/datasets";

const filterOptions = [
  {
    label: {
      en: "Most Recent",
      fr: "Plus récent",
      pt: "Mais recente",
    },
    value: "metadata_created desc",
  },
  {
    label: {
      en: "Least Recent",
      fr: "Moins récent",
      pt: "Menos recente",
    },
    value: "metadata_created asc",
  },
  {
    label: {
      en: "Name (A-Z)",
      fr: "Nom (A-Z)",
      pt: "Nome (A-Z)",
    },
    value: "name asc",
  },
  {
    label: {
      en: "Name (Z-A)",
      fr: "Nom (Z-A)",
      pt: "Nome (Z-A)",
    },
    value: "name desc",
  },
  {
    label: {
      en: "Most Relevant",
      fr: "Plus pertinent",
      pt: "Mais relevante",
    },
    value: "relevance desc",
  },
  {
    label: {
      en: "Least Relevant",
      fr: "Moins pertinent",
      pt: "Menos relevante",
    },
    value: "relevance asc",
  },
  {
    label: {
      en: "Recently Updated",
      fr: "Récemment mis à jour",
      pt: "Atualizado recentemente",
    },
    value: "metadata_modified desc",
  },
  {
    label: {
      en: "Least Recently Updated",
      fr: "Moins récemment mis à jour",
      pt: "Atualizado menos recentemente",
    },
    value: "metadata_modified asc",
  },
  {
    label: {
      en: "Author (A-Z)",
      fr: "Auteur (A-Z)",
      pt: "Autor (A-Z)",
    },
    value: "author asc",
  },
  {
    label: {
      en: "Author (Z-A)",
      fr: "Auteur (Z-A)",
      pt: "Autor (Z-A)",
    },
    value: "author desc",
  },
];

async function mapSortValuesToOptions({
  req: { locale },
  data: { sortOptions },
}) {
  const options = sortOptions.map((option) => {
    const filterOption = filterOptions.find((o) => o.value === option);
    return {
      label: filterOption.label[locale],
      value: option,
    };
  });
  return options;
}

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
      name: "sortOptions",
      label: {
        en: "Sort Options",
        fr: "Options de tri",
        pt: "Opções de classificação",
      },
      type: "select",
      hasMany: true,
      admin: {
        isClearable: true,
        isSortable: true,
      },
      options: filterOptions,
      defaultValue: [
        "metadata_created desc",
        "metadata_modified desc",
        "relevance desc",
        "relevance asc",
        "name asc",
        "name desc",
        "author asc",
        "author desc",
      ],
      required: true,
      hooks: {
        afterRead: [mapSortValuesToOptions],
      },
    },
  ],
};

export default Datasets;
