import { image, richText, linkGroup } from "@commons-ui/payload";

const ResearchCategory = {
  slug: "research-category",
  labels: { singular: "Research Category", plural: "Research Categories" },
  imageURL: "/images/cms/blocks/research-category.png",
  fields: [
    {
      name: "categories",
      type: "array",
      label: "Research Category Items",
      admin: { description: "Research category items" },
      fields: [
        image({ name: "image" }),
        {
          name: "title",
          type: "text",
          required: true,
          localized: true,
        },
        {
          name: "reportType",
          type: "select",
          required: true,
          options: [
            { label: "Baseline", value: "baseline" },
            { label: "Bi-weekly", value: "bi-weekly" },
            { label: "Situational", value: "situational" },
          ],
        },
        richText({
          name: "description",
          localized: true,
        }),
        linkGroup({
          overrides: {
            name: "link",
            admin: {
              condition: (_, siblingData) =>
                siblingData?.reportType !== "baseline",
            },
          },
        }),
        {
          name: "report",
          type: "relationship",
          relationTo: "reports",
          admin: {
            condition: (_, siblingData) =>
              siblingData?.reportType === "baseline",
            description:
              "Select the baseline report (only when Baseline is chosen)",
          },
        },
      ],
    },
    {
      name: "settings",
      type: "group",
      label: {
        en: "Single Report Settings",
      },
      fields: [
        {
          name: "backButtonLabel",
          type: "text",
          label: {
            en: "Back Button Text",
          },
          defaultValue: "Back to Research",
        },
        {
          name: "downloadLabel",
          type: "text",
          label: {
            en: "Download Report Label",
          },
          defaultValue: "Download Report",
        },
        {
          name: "overViewLabel",
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

export default ResearchCategory;
