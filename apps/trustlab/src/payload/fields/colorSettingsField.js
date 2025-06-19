import { deepmerge } from "@mui/utils";
import { ColourTextField } from "@nouance/payload-better-fields-plugin/ColourText";
import { validateHTMLColorHex } from "validate-color";

const validate = (value) => validateHTMLColorHex(value) || "Invalid hex color";
const colorSettingsField = ({
  backgroundOverrides = {},
  textOverrides = {},
}) => {
  const background = deepmerge(
    {
      name: "backgroundColor",
      admin: {
        description: "Background color in hex format",
      },
      required: true,
      validate,
    },
    backgroundOverrides,
  );
  const text = deepmerge(
    {
      name: "textColor",
      defaultValue: "#FFFFFF",
      admin: {
        description: "Text color in hex format",
      },
      required: true,
      validate,
    },
    textOverrides,
  );
  return {
    type: "row",
    fields: [...ColourTextField(background), ...ColourTextField(text)],
  };
};

export default colorSettingsField;
