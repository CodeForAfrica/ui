const validateHexColor = (value, { t }) => {
  return (
    value?.match(/^#(?:[0-9a-fA-F]{3,4}){1,2}$/) !== null ||
    t("Invalid hex color") // TODO: (@kelvinkipruto) Ensure translation works
  );
};

export default validateHexColor;
