import { validateHexColor } from "../utils/colors";

const EmbeddedChart = {
  slug: "embedded-chart",
  labels: {
    singular: {
      en: "Flourish Charts",
      fr: "Graphiques Flourish",
      pt: "Gráficos Flourish",
    },
    plural: {
      en: "Flourish Charts",
      fr: "Graphiques Flourish",
      pt: "Gráficos Flourish",
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
      type: "textarea",
      required: true,
      localized: true,
    },
    {
      name: "height",
      label: {
        en: "Height",
        fr: "Hauteur",
        pt: "Altura",
      },
      type: "number",
      required: true,
      admin: {
        description: "Height in pixels",
      },
    },
    {
      name: "width",
      label: {
        en: "Width",
        fr: "Largeur",
        pt: "Largura",
      },
      type: "number",
      required: true,
      admin: {
        description: "Width %",
      },
      defaultValue: 100,
    },
    {
      name: "backgroundColor",
      label: {
        en: "Background Color",
        fr: "Couleur de fond",
        pt: "Cor de fundo",
      },
      type: "text",
      required: true,
      validate: validateHexColor,
    },
  ],
};

export default EmbeddedChart;
