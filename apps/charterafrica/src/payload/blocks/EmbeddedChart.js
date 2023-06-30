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
      en: "Embedded Charts",
      fr: "Graphiques intégrés",
      pt: "Gráficos incorporados",
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
      name: "height",
      label: {
        en: "Height",
        fr: "Hauteur",
        pt: "Altura",
      },
      type: "text",
      required: true,
      admin: {
        description: "Height with unit (px, %, rem etc.)",
      },
    },
    {
      name: "width",
      label: {
        en: "Width",
        fr: "Largeur",
        pt: "Largura",
      },
      type: "text",
      required: true,
      admin: {
        description: "Width with unit (px, %, rem etc.)",
      },
      defaultValue: "100%",
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
