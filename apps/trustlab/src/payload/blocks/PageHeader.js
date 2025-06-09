import { image, richText } from "@commons-ui/payload";
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
    richText({
      name: "description",
      localized: true,
    }),
    image({
      overrides: {
        name: "image",
      },
    }),
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
  hooks: {
    afterRead: [({ doc }) => ({ ...doc, isPageHeader: true })],
  },
};

export default PageHeader;
