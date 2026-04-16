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
    richText({
      name: "description",
      localized: true,
    }),
    {
      name: "opportunityType",
      type: "select",
      label: { en: "Opportunity Type" },
      options: [
        { label: "Incubator", value: "incubator" },
        { label: "Intelligence Briefing", value: "intelligence-briefing" },
        { label: "Baraza", value: "baraza" },
      ],
      localized: true,
      required: true,
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
            { label: "Location", value: "location" },
            { label: "Opportunity", value: "opportunity" },
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
        condition: (_, siblingData) =>
          Boolean(
            siblingData?.hasFilters ||
            siblingData?.hasSearch ||
            siblingData?.hasSortBy,
          ),
      },
    },
    {
      name: "hasSearch",
      type: "checkbox",
      label: { en: "Enable Search" },
    },
    {
      name: "searchPlaceholderLabel",
      type: "text",
      label: { en: "Search Placeholder Label" },
      localized: true,
      admin: {
        condition: (_, siblingData) => Boolean(siblingData?.hasSearch),
      },
    },
    {
      name: "hasSortBy",
      type: "checkbox",
      label: { en: "Enable Sort By" },
    },
    {
      name: "sortByLabel",
      type: "text",
      label: { en: "Sort By Label" },
      localized: true,
      admin: {
        condition: (_, siblingData) => Boolean(siblingData?.hasSortBy),
      },
    },
    {
      name: "sortOptions",
      type: "array",
      label: { en: "Sort Options" },
      admin: {
        condition: (_, siblingData) => Boolean(siblingData?.hasSortBy),
      },
      fields: [
        {
          name: "label",
          type: "text",
          label: { en: "Option Label" },
          localized: true,
          required: true,
        },
        {
          name: "value",
          type: "text",
          label: { en: "Sort Value (e.g. -date, date, -title)" },
          required: true,
        },
      ],
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
