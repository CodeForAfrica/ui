const ParticipatingOrganizationList = {
  slug: "participating-organization-list",
  labels: {
    singular: "Participating Organisation List",
    plural: "Participating Organisation Lists",
  },
  imageURL: "/images/cms/blocks/participating-organization-list.png",
  fields: [
    {
      name: "title",
      type: "text",
      label: { en: "Title" },
      localized: true,
    },
    {
      name: "subtitle",
      type: "text",
      label: { en: "Subtitle" },
      localized: true,
    },
    {
      name: "variant",
      type: "select",
      label: { en: "Display Variant" },
      required: true,
      defaultValue: "chip",
      options: [
        { label: "Chip", value: "chip" },
        { label: "Card", value: "card" },
      ],
    },
    {
      name: "organizations",
      type: "relationship",
      relationTo: "organisations",
      hasMany: true,
      label: { en: "Organisations" },
      admin: {
        description: "Select organisations to display in this list",
        isSortable: true,
        sortOptions: "name",
      },
    },
    {
      name: "buttonLabel",
      type: "text",
      label: { en: "Button Label" },
      defaultValue: "Learn More",
      localized: true,
      admin: {
        condition: (_, siblingData) => siblingData?.variant === "card",
        description: "Label for the button on each card",
      },
    },
  ],
};

export default ParticipatingOrganizationList;
