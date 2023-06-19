import documentCloudFilterBar from "../fields/documentCloudFilterBar";
import documentCloudSource from "../fields/documentCloudSource";
import linkGroup from "../fields/linkGroup";
import defaultValue from "../utils/defaultValues";

const Documents = {
  slug: "documents",
  labels: {
    singular: {
      en: "Documents",
      fr: "Documents",
      pt: "Documentos",
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
        en: "Source",
      },
      fields: [
        documentCloudSource({
          overrides: {
            name: "organization",
            label: {
              en: "Organization",
              fr: "Organisation",
              pt: "Organização",
            },
          },
        }),
      ],
    },
    {
      type: "collapsible",
      label: {
        en: "Search & Filter",
      },
      fields: [documentCloudFilterBar()],
      admin: {
        initCollapsed: true,
      },
    },
    {
      type: "collapsible",
      label: {
        en: "Labels",
        fr: "Étiquettes",
        pt: "Rótulos",
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
                    en: "Number of Pages",
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
      admin: {
        initCollapsed: true,
      },
    },
    {
      type: "collapsible",
      label: {
        en: "Datasets",
        fr: "Ensembles de données",
        pt: "Conjuntos de dados",
      },
      fields: [
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
          linkConfig: {
            disableLinkTypeSelection: true,
            disableOpenInNewTab: true,
          },
          overrides: {
            name: "datasets",
            admin: {
              condition: (_, siblingData) => siblingData?.showDatasets,
              hideGutter: true,
            },
          },
        }),
      ],
      admin: {
        initCollapsed: true,
      },
    },
  ],
};

export default Documents;
