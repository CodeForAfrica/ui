import { validateHexColor } from "../utils/colors";

const DatasetsCharts = {
  slug: "datasets-charts",
  fields: [
    {
      name: "datasets",
      type: "group",
      label: {
        en: "Datasets",
        fr: "Ensembles de données",
        pt: "Conjuntos de dados",
      },
      fields: [
        {
          name: "label",
          type: "text",
          label: {
            en: "Label",
            fr: "Étiquette",
            pt: "Rótulo",
          },
          required: true,
          localized: true,
        },
        {
          name: "color",
          type: "text",
          validate: validateHexColor,
          required: true,
          label: {
            en: "Color",
            fr: "Couleur",
            pt: "Cor",
          },
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
          name: "label",
          type: "text",
          label: {
            en: "Label",
            fr: "Étiquette",
            pt: "Rótulo",
          },
          required: true,
          localized: true,
        },
        {
          name: "color",
          type: "text",
          validate: validateHexColor,
          required: true,
          label: {
            en: "Color",
            fr: "Couleur",
            pt: "Cor",
          },
        },
      ],
    },
  ],
};

export default DatasetsCharts;
