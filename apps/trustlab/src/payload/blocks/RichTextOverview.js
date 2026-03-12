import { richText, image } from "@commons-ui/payload";

import colorSettingsField from "../fields/colorSettingsField";

const RichTextOverview = {
  slug: "richtext-overview",
  imageURL: "/images/cms/blocks/richtext-overview.png",
  imageAltText: "RichText Overview block.",
  labels: { singular: "RichText Overview", plural: "RichText Overviews" },
  fields: [
    richText({ name: "content", required: true, localized: true }),
    image({ overrides: { name: "image", required: true } }),
    {
      name: "metrics",
      type: "array",
      label: "Metrics",
      localized: true,
      min: 3,
      max: 3,
      admin: {
        description: "Optional key stats displayed below the richtext.",
      },
      fields: [
        {
          name: "value",
          type: "text",
          required: true,
          label: "Value (e.g. 1,200)",
        },
        {
          name: "label",
          type: "text",
          required: true,
          label: "Label (e.g. Incidents)",
        },
      ],
    },
    colorSettingsField({
      backgroundOverrides: { defaultValue: "#FFFFFF" },
      textOverrides: { defaultValue: "#000000" },
    }),
  ],
};

export default RichTextOverview;
