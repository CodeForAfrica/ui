import { deepmerge } from "@mui/utils";

const groupedLabels = (overrides = {}) => {
  const basicLabels = {
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
  };

  return deepmerge(basicLabels, overrides);
};

export default groupedLabels;
