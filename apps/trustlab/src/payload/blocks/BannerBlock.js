import { image, richText } from "@commons-ui/payload";

import colorSettingsField from "../fields/colorSettingsField";

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
      colorSettingsField({
        backgroundOverrides: {
          defaultValue: backgroundColor,
        },
        textOverrides: {
          defaultValue: textColor,
        },
      }),
      ...fields,
    ],
    ...others,
  };
}

export default BannerBlock;
