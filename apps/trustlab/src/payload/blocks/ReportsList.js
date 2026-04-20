import { richText } from "@commons-ui/payload";

const ReportsList = {
  slug: "reports-list",
  labels: { singular: "Reports List", plural: "Reports Lists" },
  imageURL: "/images/cms/blocks/reports-list.png",
  fields: [
    {
      name: "condensed",
      type: "checkbox",
      label: { en: "Condensed Layout" },
    },
    {
      name: "reportsType",
      type: "select",
      label: { en: "Reports Type" },
      options: [
        { label: "Baseline", value: "baseline" },
        { label: "Situational", value: "situational" },
        { label: "Bi-weekly", value: "bi-weekly" },
      ],
      localized: true,
    },
    {
      name: "hasFilters",
      type: "checkbox",
      label: { en: "Enable Filters" },
    },
    {
      name: "reportsPerPage",
      type: "number",
      label: { en: "Reports Per Page" },
      defaultValue: 12,
      admin: {
        condition: (_, siblingData) => Boolean(siblingData?.hasPagination),
      },
    },
    {
      name: "hasPagination",
      type: "checkbox",
      label: { en: "Enable Pagination" },
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
            { label: "Report", value: "report" },
          ],
        },
        {
          name: "label",
          type: "text",
          label: "Filter Label",
          localized: true,
          required: true,
        },
      ],
    },
    {
      name: "applyFiltersLabel",
      type: "text",
      localized: true,
      admin: {
        condition: (_, siblingData) => Boolean(siblingData?.hasFilters),
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
          type: "select",
          label: { en: "Sort Value" },
          required: true,
          options: [
            { label: "Published Date (Newest first)", value: "-date" },
            { label: "Published Date (Oldest first)", value: "date" },
            { label: "Title (A → Z)", value: "title" },
            { label: "Title (Z → A)", value: "-title" },
            { label: "Created At (Newest first)", value: "-createdAt" },
            { label: "Created At (Oldest first)", value: "createdAt" },
            { label: "Updated At (Newest first)", value: "-updatedAt" },
            { label: "Updated At (Oldest first)", value: "updatedAt" },
          ],
        },
      ],
    },
    {
      name: "defaultSort",
      type: "select",
      label: { en: "Default Sort" },
      defaultValue: "-date",
      admin: {
        condition: (_, siblingData) => Boolean(siblingData?.hasSortBy),
        description: "Sort applied on initial load and after clearing filters.",
      },
      options: [
        { label: "Published Date (Newest first)", value: "-date" },
        { label: "Published Date (Oldest first)", value: "date" },
        { label: "Title (A → Z)", value: "title" },
        { label: "Title (Z → A)", value: "-title" },
        { label: "Created At (Newest first)", value: "-createdAt" },
        { label: "Created At (Oldest first)", value: "createdAt" },
        { label: "Updated At (Newest first)", value: "-updatedAt" },
        { label: "Updated At (Oldest first)", value: "updatedAt" },
      ],
    },
    {
      name: "cardActionLabel",
      type: "text",
      localized: true,
      defaultValue: "Download Report",
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
      name: "notFoundTitleLabel",
      type: "text",
      label: {
        en: "Not Found Title Label",
      },
      defaultValue: "No results found",
    },
    richText({
      name: "notFoundSubtitleLabel",
      localized: true,
    }),
  ],
};

export default ReportsList;
