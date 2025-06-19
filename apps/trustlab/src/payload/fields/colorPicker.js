import { deepmerge } from "@mui/utils";
import { ColourTextField } from "@nouance/payload-better-fields-plugin/ColourText";
import { validateHTMLColorHex } from "validate-color";

const colorPicker = ({ backgroundOverrides = {}, textOverrides = {} }) => {
  const background = deepmerge(
    {
      name: "backgroundColor",
      admin: {
        description: "Background color in hex format",
      },
      required: true,
      validate: (value) => validateHTMLColorHex(value) || "Invalid hex color",
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
      validate: (value) => validateHTMLColorHex(value) || "Invalid hex color",
    },
    textOverrides,
  );
  return {
    type: "row",
    fields: [...ColourTextField(background), ...ColourTextField(text)],
  };
};

export default colorPicker;
