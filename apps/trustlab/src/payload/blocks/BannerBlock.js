import { image, richText } from "@commons-ui/payload";
import { ColourTextField } from "@nouance/payload-better-fields-plugin/ColourText";
import { validateHTMLColorHex } from "validate-color";

function BannerBlock(
  slug,
  imageURL,
  {
    backgroundColor = "#02041C",
    textColor = "#FFFFFF",
    fields = [],
    ...others
  } = {},
) {
  return {
    slug,
    imageURL,
    fields: [
      {
        type: "text",
        name: "title",
        required: true,
        localized: true,
      },
      richText({
        name: "description",
        localized: true,
      }),
      image({
        overrides: {
          name: "image",
          required: true,
        },
      }),
      {
        type: "row",
        fields: [
          ...ColourTextField({
            name: "backgroundColor",
            defaultValue: backgroundColor,
            admin: {
              description: "Background color in hex format",
            },
            required: true,
            validate: (value) =>
              validateHTMLColorHex(value) || "Invalid hex color",
          }),
          ...ColourTextField({
            name: "textColor",
            defaultValue: textColor,
            required: true,
            admin: {
              description: "Text color in hex format",
            },
            validate: (value) =>
              validateHTMLColorHex(value) || "Invalid hex color",
          }),
        ],
      },
      ...fields,
    ],
    ...others,
  };
}

export default BannerBlock;
