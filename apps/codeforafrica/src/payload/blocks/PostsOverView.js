import linkGroup from "../fields/links/linkGroup";

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

const PostsOverview = {
  slug: "posts-overview",
  imageURL: "/images/cms/blocks/posts_overview.jpg",
  imageAltText: "Stories & Opportunities Overview",
  fields: [
    {
      name: "title",
      label: "Title",
      required: true,
      type: "text",
    },
    {
      name: "primaryTag",
      label: "Post Type",
      required: true,
      type: "select",
      options: primaryTags,
      hasMany: false,
    },
    {
      name: "featured",
      type: "relationship",
      relationTo: "posts",
      hasMany: false,
      required: true,
    },
    {
      name: "posts",
      type: "relationship",
      relationTo: "posts",
      hasMany: true,
      minRows: 3,
      maxRows: 3,
    },
    linkGroup({ overrides: { name: "action", label: "Action" } }),
    {
      name: "labels",
      label: "Labels",
      type: "group",
      fields: [
        {
          name: "readStory",
          label: "Read Story",
          required: true,
          type: "text",
          defaultValue: "Read Story",
        },
      ],
    },
  ],
};

export default PostsOverview;
