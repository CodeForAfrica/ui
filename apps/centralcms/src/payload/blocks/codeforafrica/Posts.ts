import { Block } from "payload";

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

const Posts: Block = {
  // `posts` slug is already used by Post collection
  slug: "post-list",
  imageURL: "/images/cms/blocks/codeforafrica/posts.jpg",
  imageAltText: "Stories & Opportunities",
  labels: {
    singular: {
      en: "Posts",
    },
    plural: {
      en: "Posts",
    },
  },
  fields: [
    {
      name: "primaryTag",
      label: "Post Type",
      type: "select",
      hasMany: false,
      options: primaryTags,
      required: true,
    },
    {
      name: "stories",
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
          type: "text",
          required: true,
          defaultValue: "Stories",
        },
      ],
      admin: {
        condition: (_, siblingData) => siblingData.primaryTag === "stories",
      },
    },
    {
      name: "labels",
      type: "group",
      fields: [
        {
          name: "search",
          type: "text",
          required: true,
          defaultValue: "Search Posts",
        },
        {
          name: "readMore",
          type: "text",
          required: true,
          defaultValue: "Read More",
        },
      ],
    },
  ],
};

export default Posts;
