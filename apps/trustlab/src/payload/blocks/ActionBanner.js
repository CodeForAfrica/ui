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
      },
      linkConfig: {
        required: false,
      },
    }),
    {
      name: "buttonAriaLabel",
      type: "text",
      label: { en: "Button Accessible Label" },
      localized: true,
      admin: {
        description:
          'Provide a descriptive label for screen readers when the button text is generic (e.g. "Learn more about Baraza"). Leave blank if the button text is already descriptive.',
      },
    },
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
    {
      name: "embedCode",
      type: "code",
      label: { en: "Embed Code" },
      admin: {
        description:
          "Optional embed code (e.g., iframe). If provided, the button will open a dialog with this content instead of navigating to the link.",
      },
    },
    {
      name: "embedDialogTitle",
      type: "text",
      label: { en: "Embed Dialog Title" },
      localized: true,
      admin: {
        condition: (_, siblingData) => Boolean(siblingData?.embedCode),
      },
    },
    {
      name: "embedCloseLabel",
      type: "text",
      label: { en: "Embed Close Button Label" },
      defaultValue: "Close",
      localized: true,
      admin: {
        condition: (_, siblingData) => Boolean(siblingData?.embedCode),
      },
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
