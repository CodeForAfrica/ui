import { ColourTextField } from "@nouance/payload-better-fields-plugin/ColourText";
import { validateHTMLColorHex } from "validate-color";

const PageHeader = {
  slug: "page-header",
  imageURL: "/images/cms/blocks/page-header.png",
  fields: [
    {
      type: "text",
      name: "title",
      required: true,
    },
    {
      type: "textarea",
      name: "description",
      required: true,
    },
    {
      type: "upload",
      name: "image",
      relationTo: "media",
      required: true,
    },
    {
      type: "checkbox",
      name: "isPageHeader",
      defaultValue: true,
      label: "Is Page Header",
      admin: {
        hidden: true,
        readOnly: true,
      },
    },
    {
      type: "row",
      fields: [
        ...ColourTextField({
          name: "backgroundColor",
          defaultValue: "#02041C",
          admin: {
            description: "Background color of the banner in hex format",
          },
          required: true,
          validate: (value) =>
            validateHTMLColorHex(value) || "Invalid hex color",
        }),
        ...ColourTextField({
          name: "textColour",
          defaultValue: "#ffffff",
          required: true,
          admin: {
            description: "Background color of the banner in hex format",
          },
          validate: (value) =>
            validateHTMLColorHex(value) || "Invalid hex color",
        }),
      ],
    },
  ],
};

export default PageHeader;
