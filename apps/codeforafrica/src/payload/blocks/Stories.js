import articles from "../fields/articles";

const Stories = {
  slug: "stories",
  fields: [
    articles({
      name: "featured",
      label: "Featured Story",
      hasMany: false,
    }),
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
