import { richText, linkGroup } from "@commons-ui/payload";
import { ColourTextField } from "@nouance/payload-better-fields-plugin/ColourText";
import { validateHTMLColorHex } from "validate-color";

import colorSettingsField from "../fields/colorSettingsField";

const validateColor = (value) =>
  validateHTMLColorHex(value) || "Invalid hex color";

const ActionBanner = {
  slug: "action-banner",
  imageURL: "/images/cms/blocks/action-banner.png",
  imageAltText: "Used in homepage.",
  fields: [
    richText({
      name: "title",
      required: true,
      localized: true,
    }),
    linkGroup({
      overrides: {
        name: "buttonLink",
        label: "Button Link",
        required: true,
      },
      linkConfig: {
        required: false,
      },
    }),
    {
      name: "button",
      type: "group",
      required: true,
      fields: [
        ...ColourTextField({
          name: "borderColor",
          admin: {
            description: "Border Color of Action button",
          },
          required: true,
          validate: validateColor,
          defaultValue: "#FFFFFF",
        }),
      ],
    },
    colorSettingsField({
      backgroundOverrides: {
        defaultValue: "#181D27",
      },
      textOverrides: {
        defaultValue: "#FFFFFF",
      },
    }),
  ],
};

export default ActionBanner;
