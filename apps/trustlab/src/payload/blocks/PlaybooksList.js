const PlaybooksList = {
  slug: "playbooks-list",
  labels: { singular: "Playbooks List", plural: "Playbooks Lists" },
  imageURL: "/images/cms/blocks/playbooks-list.png",
  fields: [
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
      defaultValue: "Download Playbook",
    },
  ],
};

export default PlaybooksList;
