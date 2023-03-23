const OurGrantees = {
  slug: "our-grantees",
  labels: {
    singular: {
      en: "Grantees",
      fr: "Bénéficiaires",
      pt: "Beneficiários",
    },
    plural: {
      en: "Grantees",
      fr: "Bénéficiaires",
      pt: "Beneficiários",
    },
  },
  fields: [
    {
      name: "title",
      label: {
        en: "Title",
        fr: "Titre",
        pt: "Título",
      },
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "sort",
      label: {
        en: "Sort",
      },
      type: "select",
      options: [
        {
          value: "-publishedOn",
          label: "Most Recent",
        },
        {
          value: "publishedOn",
          label: "Least Recent",
        },
        {
          value: "title",
          label: "Title A-Z",
        },
        {
          value: "-title",
          label: "Title Z-A",
        },
      ],
      defaultValue: "-publishedOn",
      required: true,
    },
  ],
};

export default OurGrantees;
