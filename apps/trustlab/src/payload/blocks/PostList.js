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
      name: "dateLabel",
      type: "text",
      localized: true,
    },
  ],
};

export default PostList;
