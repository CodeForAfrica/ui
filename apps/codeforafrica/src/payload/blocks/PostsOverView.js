import linkGroup from "../fields/links/linkGroup";

const PostsOverview = {
  slug: "posts-overview",
  imageURL: "/images/cms/blocks/posts_overview.jpg",
  imageAltText: "Stories & Opportunities Overview",
  fields: [
    {
      name: "title",
      label: "Title",
      type: "text",
      required: true,
    },
    {
      name: "primaryTag",
      label: "Post Type",
      type: "text",
      defaultValue: "stories",
      admin: {
        hidden: true,
      },
    },
    {
      name: "featured",
      label: "Featured Story",
      type: "group",
      fields: [
        {
          name: "story",
          type: "relationship",
          relationTo: "posts",
          hasMany: false,
          required: true,
        },
        {
          name: "action",
          label: "Action Label",
          type: "text",
          defaultValue: "Read Story",
        },
      ],
    },
    {
      name: "stories",
      label: "Stories",
      type: "group",
      fields: [
        {
          name: "items",
          label: "Stories",
          type: "relationship",
          relationTo: "posts",
          hasMany: true,
          minRows: 1,
          maxRows: 3,
          required: true,
        },
        linkGroup({
          overrides: {
            name: "action",
            label: "Browse More Action",
          },
        }),
      ],
    },
  ],
};

export default PostsOverview;
