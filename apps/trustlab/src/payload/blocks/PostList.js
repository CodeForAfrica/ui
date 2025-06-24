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
      name: "deadlineLabel",
      type: "text",
      localized: true,
      defaultValue: "Deadline On",
    },
  ],
};

export default PostList;
