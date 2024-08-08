const PostTab = {
  label: "Post",
  fields: [
    {
      type: "collapsible",
      label: "Story",
      fields: [
        {
          name: "stories",
          label: "Recent stories",
          type: "group",
          localized: true,
          fields: [
            {
              name: "showRecent",
              label: "Show recent stories",
              type: "checkbox",
              required: true,
              defaultValue: false,
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
          ],
          admin: {
            className: "group-field-nested",
          },
        },
      ],
    },
  ],
};

export default PostTab;
