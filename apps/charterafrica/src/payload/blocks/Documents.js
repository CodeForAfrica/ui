import documentCloud from "../fields/documentCloud";
import linkGroup from "../fields/linkGroup";
import defaultValue from "../utils/defaultValues";

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
