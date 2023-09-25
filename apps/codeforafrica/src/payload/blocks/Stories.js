const Stories = {
  slug: "stories",
  fields: [
    {
      name: "featured",
      type: "relationship",
      relationTo: "article",
      hasMany: false,
    },
    {
      name: "title",
      label: "Title",
      required: true,
      type: "text",
    },
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
          defaultValue: "Search Stories",
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

export default Stories;
