import { validateHexColor } from "../utils/colors";

const FlourishChart = {
  slug: "flourish-chart",
  labels: {
    singular: {
      en: "Flourish Chart",
    },
    plural: {
      en: "Flourish Chart",
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
      localized: true,
    },
    {
      name: "chartId",
      label: {
        en: "Chart ID",
      },
      type: "text",
      required: true,
      localized: true,
      admin: {
        description:
          "This should be in type/number format e.g. visualisation/14834715 or story/1946372",
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
  ],
};

export default FlourishChart;
