import { image, richText, linkGroup } from "@commons-ui/payload";

const OpportunityCategory = {
  slug: "opportunity-category",
  labels: {
    singular: "Opportunity Category",
    plural: "Opportunity Categories",
  },
  imageURL: "/images/cms/blocks/opportunity-category.png",
  fields: [
    {
      name: "categories",
      type: "array",
      label: "Opportunity Category Items",
      admin: { description: "Opportunity category items" },
      fields: [
        image({ name: "image" }),
        {
          name: "title",
          type: "text",
          required: true,
          localized: true,
        },
        {
          name: "opportunityType",
          type: "select",
          required: true,
          options: [
            { label: "Baraza", value: "baraza" },
            { label: "Incubator", value: "incubator" },
            { label: "Intelligence Briefing", value: "intelligence-briefing" },
          ],
        },
        richText({
          name: "description",
          localized: true,
        }),
        linkGroup({
          overrides: {
            name: "link",
          },
        }),
      ],
    },
    {
      name: "settings",
      type: "group",
      label: {
        en: "Single Opportunity Settings",
      },
      fields: [
        {
          name: "backButtonLabel",
          type: "text",
          label: {
            en: "Back Button Text",
          },
          defaultValue: "Back to Opportunities",
        },
        {
          name: "viewMoreLabel",
          type: "text",
          label: {
            en: "View More Label",
          },
          defaultValue: "View more",
        },
        {
          name: "overviewLabel",
          type: "text",
          label: {
            en: "Overview Section Label",
          },
          defaultValue: "Overview",
        },
      ],
    },
  ],
};

export default OpportunityCategory;
