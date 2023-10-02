const OurTeam = {
  slug: "our-team",
  imageURL: "/images/cms/blocks/team.png",
  imageAltText: "Our Team",
  labels: {
    singular: {
      en: "Team",
    },
    plural: {
      en: "Team",
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
    {
      name: "labels",
      label: "Labels",
      type: "group",
      admin: {
        description: "Labels/Titles to be used in member view page",
      },
      fields: [
        {
          name: "projects",
          label: "Projects",
          required: true,
          type: "text",
          defaultValue: "Projects",
        },
      ],
    },
  ],
};

export default OurTeam;
