import linkGroup from "#civicsignalblog/payload/fields/links/linkGroup";

const FeaturedStories = {
  slug: "featured-stories",
  imageURL: "/images/cms/blocks/featured_stories.jpg",
  imageAltText: "Featured Stories",
  labels: {
    singular: {
      en: "Featured Stories",
    },
    plural: {
      en: "Featured Stories",
    },
  },
  fields: [
    {
      name: "title",
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

export default FeaturedStories;
