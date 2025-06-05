import { ColourTextField } from "@nouance/payload-better-fields-plugin/ColourText";
import { validateHTMLColorHex } from "validate-color";

const WhatWeDo = {
  slug: "what-we-do",
  imageURL: "/images/cms/blocks/what-we-do.svg",
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
      defaultValue: false,
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
          defaultValue: "#F0F0F5",
          admin: {
            description: "Background color of the banner in hex format",
          },
          required: true,
          validate: (value) =>
            validateHTMLColorHex(value) || "Invalid hex color",
        }),
        ...ColourTextField({
          name: "textColour",
          defaultValue: "#000000",
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

export default WhatWeDo;
