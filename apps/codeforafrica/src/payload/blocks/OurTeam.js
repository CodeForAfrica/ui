const OurTeam = {
  slug: "our-team",
  imageURL: "/images/cms/blocks/team.png",
  imageAltText: "Our Team",
  labels: {
    singular: {
      en: "Our Team",
    },
    plural: {
      en: "Our Team",
    },
  },
  fields: [
    {
      name: "title",
      label: {
        en: "Title",
      },
      type: "text",
      localized: true,
      required: true,
    },
    {
      name: "fields",
      type: "select",
      label: {
        en: "Filter By",
      },
      hasMany: true,
      options: [
        {
          value: "team",
          label: { en: "Team" },
        },
        {
          value: "country",
          label: { en: "Country" },
        },
      ],
    },
  ],
};

export default OurTeam;
