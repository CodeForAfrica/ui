const PostsTab = {
  label: "Posts",
  fields: [
    {
      name: "stories",
      label: "Stories",
      type: "group",
      fields: [
        {
          name: "showRecent",
          label: "Show Recent Stories",
          type: "checkbox",
          required: true,
          defaultValue: false,
          admin: {
            description: "Show recent stories on the individual post page",
          },
        },
        {
          name: "title",
          label: "Title",
          type: "text",
          required: true,
          defaultValue: "Recent Stories",
          admin: {
            condition: (_, data) => data.showRecent,
          },
        },
        {
          name: "primaryTag",
          label: "Primary Tag",
          type: "text",
          required: true,
          defaultValue: "stories",
          admin: {
            hidden: true,
          },
        },
      ],
    },
    {
      name: "opportunities",
      label: "Opportunities",
      type: "group",
      fields: [
        {
          name: "showRecent",
          label: "Show Recent Opportunities",
          type: "checkbox",
          required: true,
          defaultValue: false,
          admin: {
            description:
              "Show recent opportunities on the individual opportunity page",
          },
        },
        {
          name: "title",
          label: "Title",
          type: "text",
          required: true,
          defaultValue: "Recent Opportunities",
          admin: {
            condition: (_, data) => data.showRecent,
          },
        },
        {
          name: "primaryTag",
          label: "Primary Tag",
          type: "text",
          required: true,
          defaultValue: "opportunities",
          admin: {
            hidden: true,
          },
        },
      ],
    },
  ],
};

export default PostsTab;
