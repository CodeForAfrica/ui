import { richText } from "@commons-ui/payload";

const OpportunityList = {
  slug: "opportunity-list",
  labels: { singular: "Opportunity List", plural: "Opportunity Lists" },
  imageURL: "/images/cms/blocks/opportunity-list.png",
  fields: [
    {
      name: "title",
      type: "text",
      label: { en: "Section Title" },
      localized: true,
    },
    {
      name: "opportunityType",
      type: "select",
      label: { en: "Opportunity Type" },
      options: [
        { label: "All", value: "all" },
        { label: "Incubator", value: "incubator" },
        { label: "Intelligence Briefing", value: "intelligence-briefing" },
        { label: "Baraza", value: "baraza" },
      ],
      defaultValue: "all",
      localized: true,
    },
    {
      name: "hasFilters",
      type: "checkbox",
      label: { en: "Enable Filters" },
    },
    {
      name: "filterByLabel",
      type: "text",
      label: { en: "Filter By Label" },
      localized: true,
      admin: {
        condition: (_, siblingData) => Boolean(siblingData?.hasFilters),
      },
    },
    {
      name: "filters",
      type: "array",
      label: "Filter Options",
      admin: {
        condition: (_, siblingData) => Boolean(siblingData?.hasFilters),
      },
      fields: [
        {
          name: "type",
          type: "select",
          required: true,
          options: [
            { label: "Year", value: "year" },
            { label: "Month", value: "month" },
            { label: "Type", value: "type" },
            { label: "Location", value: "location" },
          ],
        },
        {
          name: "label",
          type: "text",
          label: "Filter Label",
          localized: true,
          required: true,
        },
        {
          name: "options",
          type: "array",
          label: "Custom Options",
          admin: {
            condition: (_, siblingData) =>
              siblingData?.type === "location" || siblingData?.type === "type",
          },
          fields: [
            {
              name: "label",
              type: "text",
              required: true,
            },
            {
              name: "value",
              type: "text",
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: "clearFiltersLabel",
      type: "text",
      localized: true,
      admin: {
        condition: (_, siblingData) => Boolean(siblingData?.hasFilters),
      },
    },
    {
      name: "hasPagination",
      type: "checkbox",
      label: { en: "Enable Pagination" },
    },
    {
      name: "itemsPerPage",
      type: "number",
      label: { en: "Items Per Page" },
      defaultValue: 12,
      admin: {
        condition: (_, siblingData) => Boolean(siblingData?.hasPagination),
      },
    },
    {
      name: "showJumpToPage",
      type: "checkbox",
      label: { en: "Show Jump to Page" },
      defaultValue: true,
      admin: {
        condition: (_, siblingData) => Boolean(siblingData?.hasPagination),
      },
    },
    {
      name: "jumpToPageLabel",
      type: "text",
      label: { en: "Jump to Page Label" },
      defaultValue: "Go to page",
      localized: true,
      admin: {
        condition: (_, siblingData) =>
          Boolean(siblingData?.hasPagination) &&
          Boolean(siblingData?.showJumpToPage),
      },
    },
    {
      name: "cardActionLabel",
      type: "text",
      localized: true,
      defaultValue: "View more",
    },
    {
      name: "notFoundTitleLabel",
      type: "text",
      label: {
        en: "Not Found Title Label",
      },
      defaultValue: "No opportunities found",
      localized: true,
    },
    richText({
      name: "notFoundSubtitleLabel",
      localized: true,
    }),
  ],
};

export default OpportunityList;
