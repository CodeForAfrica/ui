const Opportunities = {
  slug: "opportunities",
  fields: [
    {
      name: "labels",
      label: "Labels",
      type: "group",
      fields: [
        {
          name: "search",
          label: "Search",
          required: true,
          type: "text",
          defaultValue: "Search Opportunities",
        },
        {
          name: "readMore",
          label: "Read More",
          required: true,
          type: "text",
          defaultValue: "Read More",
        },
      ],
    },
  ],
};

export default Opportunities;
