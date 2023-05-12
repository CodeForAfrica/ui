import updateDatasetsStatistics from "../utils/datasets";

const OpenAfrica = {
  slug: "openAfrica",
  label: "openAfrica",
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
      name: "statistics",
      type: "group",
      label: {
        en: "Statistics",
        fr: "Statistiques",
        pt: "Estatísticas",
      },
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "datasets",
              type: "number",
              label: {
                en: "Datasets",
                fr: "Jeux de données",
                pt: "Conjuntos de dados",
              },
              defaultValue: 1,
              admin: {
                readOnly: true,
                width: "50%",
              },
            },
            {
              name: "documents",
              type: "number",
              label: {
                en: "Documents",
                fr: "Documents",
                pt: "Documentos",
              },
              defaultValue: 1,
              admin: {
                readOnly: true,
                width: "50%",
              },
            },
          ],
        },
      ],
    },
  ],
};

export default OpenAfrica;
