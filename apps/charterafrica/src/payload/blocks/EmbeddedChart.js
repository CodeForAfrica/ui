import { validateHexColor } from "../utils/colors";

const EmbeddedChart = {
  slug: "embedded-chart",
  labels: {
    singular: {
      en: "Embedded Chart",
      fr: "Graphique intégré",
      pt: "Gráfico incorporado",
    },
    plural: {
      en: "Embedded Chart",
      fr: "Graphique intégré",
      pt: "Gráfico incorporado",
    },
  },
  fields: [
    {
      name: "title",
      label: {
        en: "Title",
        fr: "Titre",
        pt: "Título",
      },
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "subtitle",
      label: {
        en: "Subtitle",
        fr: "Sous-titre",
        pt: "Subtítulo",
      },
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "html",
      label: {
        en: "Embed Code",
        fr: "Code d'intégration",
        pt: "Código de incorporação",
      },
      type: "code",
      required: true,
      localized: true,
      admin: {
        language: "html",
      },
    },
    {
      name: "backgroundColor",
      label: {
        en: "Background color",
        fr: "Couleur de fond",
        pt: "Cor de fundo",
      },
      type: "text",
      required: true,
      defaultValue: "#ffffff",
      validate: validateHexColor,
    },
    {
      name: "width",
      label: {
        en: "Width",
        fr: "Largeur",
      },
      type: "group",
      required: true,
      fields: [
        {
          name: "xs",
          label: {
            en: "Mobile",
            pt: "Móveis",
          },
          type: "text",
          required: true,
          localized: true,
          defaultValue: "100%",
        },
        {
          name: "sm",
          label: {
            en: "Tablet",
            fr: "Tablette",
          },
          type: "text",
          required: true,
          localized: true,
          defaultValue: "100%",
        },
        {
          name: "md",
          label: {
            en: "Desktop",
          },
          type: "text",
          required: true,
          localized: true,
          defaultValue: "100%",
        },
      ],
    },
  ],
};

export default EmbeddedChart;
