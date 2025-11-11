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
        { label: { en: "Biweekly Reports" }, value: "biweekly" },
        { label: { en: "Situational Reports" }, value: "situational" },
      ],
      localized: true,
    },
    {
      name: "hasFilters",
      type: "checkbox",
      label: { en: "Enable Filters" },
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
        condition: (_, siblingData) => Boolean(siblingData?.hasFilters),
      },
    },
  ],
};

export default ReportsList;
