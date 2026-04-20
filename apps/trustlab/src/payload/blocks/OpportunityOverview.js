import { richText, image } from "@commons-ui/payload";

import colorSettingsField from "../fields/colorSettingsField";

const OpportunityOverview = {
  slug: "opportunity-overview",
  imageURL: "/images/cms/blocks/opportunity-overview.png",
  imageAltText: "Opportunity Overview block.",
  labels: { singular: "Opportunity Overview", plural: "Opportunity Overviews" },
  fields: [
    {
      name: "title",
      type: "text",
      localized: true,
    },
    richText({ name: "content", required: true, localized: true }),
    image({ overrides: { name: "image", required: true } }),
    {
      name: "metrics",
      type: "array",
      label: "Metrics",
      localized: true,
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

export default OpportunityOverview;
