const OurWork = {
  slug: "our-work",
  imageURL: "/images/cms/blocks/projects.png",
  imageAltText: "Our Work",
  labels: {
    singular: {
      en: "Our Work",
    },
    plural: {
      en: "Our Work",
    },
  },
  fields: [
    {
      name: "title",
      label: {
        en: "Title",
      },
      type: "text",
    },
    {
      name: "labels",
      label: "Labels",
      type: "group",
      fields: [
        {
          name: "description",
          label: "Description",
          required: true,
          type: "text",
          defaultValue: "Description",
        },
        {
          name: "details",
          label: "Details",
          required: true,
          type: "text",
          defaultValue: "Details",
        },
        {
          name: "team",
          label: "Team",
          required: true,
          type: "text",
          defaultValue: "Team",
        },
        {
          name: "projects",
          label: "Projects",
          required: true,
          type: "text",
          defaultValue: "Explore other Projects",
        },
        {
          name: "partners",
          label: "Partners",
          required: true,
          type: "text",
          defaultValue: "Partners",
        },
        {
          name: "donors",
          label: "Donors",
          required: true,
          type: "text",
          defaultValue: "Donors",
        },
      ],
      admin: {
        description: "Labels/Titles to be used in single project view page",
      },
    },
  ],
};

export default OurWork;
