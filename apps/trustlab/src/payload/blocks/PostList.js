const PostList = {
  slug: "post-list",
  imageURL: "/images/cms/blocks/post-list.png",
  imageAltText: "Post List",
  fields: [
    {
      name: "title",
      type: "text",
      localized: true,
    },
    {
      name: "showAllPosts",
      type: "checkbox",
      localized: true,
      defaultValue: true,
      label: "Show All Posts",
    },
    {
      name: "posts",
      type: "relationship",
      relationTo: "posts",
      hasMany: true,
      minRows: 1,
      admin: {
        condition: (_, { showAllPosts }) => {
          return !showAllPosts;
        },
      },
    },
    {
      name: "linkLabel",
      type: "text",
      required: true,
      localized: true,
      defaultValue: "Apply Now",
    },
    {
      name: "closedLabel",
      type: "text",
      required: true,
      localized: true,
      defaultValue: "Closed",
    },
    {
      name: "deadlineLabel",
      type: "text",
      localized: true,
      defaultValue: "Deadline On",
    },
  ],
};

export default PostList;
