const ParticipatingOrganizationList = {
  slug: "participating-organization-list",
  labels: {
    singular: "Participating Organization List",
    plural: "Participating Organization Lists",
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
      relationTo: "participating-organizations",
      hasMany: true,
      label: { en: "Organizations" },
      admin: {
        description: "Select organizations to display in this list",
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
