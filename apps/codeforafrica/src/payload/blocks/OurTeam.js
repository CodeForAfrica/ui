const OurTeam = {
  slug: "our-team",
  imageURL: "/images/cms/blocks/team.png",
  imageAltText: "Our team.",
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
      type: "text",
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
      type: "group",
      admin: {
        description: "Labels/Titles to be used in member view page",
      },
      fields: [
        {
          name: "projects",
          type: "text",
          required: true,
          defaultValue: "Projects",
        },
      ],
    },
  ],
};

export default OurTeam;
