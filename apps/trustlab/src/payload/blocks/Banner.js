import { ColourTextField } from "@nouance/payload-better-fields-plugin/ColourText";
import { validateHTMLColorHex } from "validate-color";

const Banner = {
  slug: "banner",
  imageURL: "/images/cms/blocks/banner.png",
  fields: [
    {
      type: "text",
      name: "title",
      required: true,
    },
    {
      type: "textarea",
      name: "description",
    },
    {
      type: "upload",
      name: "image",
      relationTo: "media",
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
          validate: (value) =>
            validateHTMLColorHex(value) || "Invalid hex color",
        }),
        ...ColourTextField({
          name: "textColour",
          defaultValue: "#000000",
          admin: {
            description: "Background color of the banner in hex format",
          },
          validate: (value) =>
            validateHTMLColorHex(value) || "Invalid hex color",
        }),
        {
          type: "checkbox",
          name: "isPageHeader",
          defaultValue: false,
          label: "Is Page Header",
          admin: {
            style: {
              alignSelf: "center",
            },
          },
        },
      ],
    },
  ],
};

export default Banner;
