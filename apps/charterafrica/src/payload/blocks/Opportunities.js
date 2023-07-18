const Opportunities = {
  slug: "opportunities",
  labels: {
    singular: {
      en: "Opportunities",
      fr: "Opportunités",
      pt: "Oportunidades",
    },
    plural: {
      en: "Opportunities",
      fr: "Opportunités",
      pt: "Oportunidades",
    },
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: {
        en: "Title",
        fr: "Titre",
        pt: "Título",
      },
      localized: true,
    },
    {
      name: "featured",
      label: {
        en: "Featured",
        pt: "Destaque",
        fr: "Qualité",
      },
      type: "relationship",
      relationTo: ["events", "fellowships", "grants"],
    },
    {
      name: "items",
      type: "array",
      fields: [
        {
          name: "item",
          label: { en: "Item", fr: "Item", pt: "Item" },
          type: "select",
          options: [
            {
              label: "Events",
              value: "events",
            },
            {
              label: "Fellowships",
              value: "fellowships",
            },
            {
              label: "Grants",
              value: "grants",
            },
          ],
          required: true,
          admin: {
            isClearable: true,
          },
        },
        {
          name: "label",
          type: "text",
          label: {
            en: "Label",
            pt: "Rótulo",
          },
          required: true,
          localized: true,
        },
      ],
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: ({ data }) => {
            return data?.label || data?.id;
          },
        },
      },
    },
  ],
};

export default Opportunities;
