const primaryTags = [
  {
    label: "Stories",
    value: "stories",
  },
  {
    label: "Opportunities",
    value: "opportunities",
  },
];

const Posts = {
  slug: "post-list",
  fields: [
    {
      name: "primaryTag",
      label: "Primary Tag",
      required: true,
      type: "select",
      options: primaryTags,
      hasMany: false,
    },
    {
      name: "stories",
      label: "Stories",
      type: "group",
      fields: [
        {
          name: "featured",
          type: "relationship",
          relationTo: "posts",
          hasMany: false,
        },
        {
          name: "title",
          label: "Title",
          required: true,
          type: "text",
          defaultValue: "Stories",
        },
      ],
      admin: {
        condition: (_, siblingData) => siblingData.primaryTag === "stories",
      },
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
          defaultValue: "Search Posts",
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

export default Posts;