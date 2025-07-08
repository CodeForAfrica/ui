const PostList = {
  slug: "post-list",
  imageURL: "/images/cms/blocks/post-list.png",
  imageAltText: "Post List",
  fields: [
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
    {
      name: "publishedLabel",
      type: "text",
      localized: true,
      defaultValue: "Published On",
    },
  ],
};

export default PostList;
