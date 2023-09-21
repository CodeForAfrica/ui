import stories from "../fields/stories";

const Stories = {
  slug: "stories-list",
  fields: [
    stories({
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
      name: "search",
      label: "Search Label",
      required: true,
      type: "text",
      defaultValue: "Search Stories",
    },
  ],
};

export default Stories;
