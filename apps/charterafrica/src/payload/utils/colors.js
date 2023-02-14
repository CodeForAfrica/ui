export const validateHexColor = (value, { t }) => {
  return (
    value?.match(/^#(?:[0-9a-fA-F]{3,4}){1,2}$/) !== null ||
    t("charterafrica.site:validHexColor")
  );
};

export const blendModeOptions = [
  {
    value: "color",
  },
  {
    label: "Color Burn",
    value: "color-burn",
  },
  {
    label: "Color Dodge",
    value: "color-dodge",
  },
  {
    label: "Darken",
    value: "darken",
  },
  {
    label: "Difference",
    value: "difference",
  },
  {
    label: "Exclusion",
    value: "exclusion",
  },
  {
    label: "Hard Light",
    value: "hard-light",
  },
  {
    label: "Hue",
    value: "hue",
  },
  {
    label: "Inherit",
    value: "inherit",
  },
  {
    label: "Initial",
    value: "initial",
  },

  {
    label: "Lighten",
    value: "lighten",
  },

  {
    label: "Luminosity",
    value: "luminosity",
  },
  {
    label: "Multiply",
    value: "multiply",
  },
  {
    label: "Normal",
    value: "normal",
  },
  {
    label: "Overlay",
    value: "overlay",
  },
  {
    label: "Revert",
    value: "revert",
  },
  {
    label: "Revert Layer",
    value: "revert-layer",
  },
  {
    label: "Saturation",
    value: "saturation",
  },
  {
    label: "Screen",
    value: "screen",
  },

  {
    label: "Soft Light",
    value: "soft-light",
  },

  {
    label: "Unset",
    value: "unset",
  },
];

export const MuiButtonColors = [
  {
    label: "Error",
    value: "error",
  },
  {
    label: "Inherit",
    value: "inherit",
  },
  {
    label: "Info",
    value: "info",
  },
  {
    label: "Primary",
    value: "primary",
  },
  {
    label: "Secondary",
    value: "secondary",
  },
  {
    label: "Success",
    value: "success",
  },

  {
    label: "Warning",
    value: "warning",
  },
];
