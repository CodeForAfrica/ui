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

const RelatedPosts = {
  slug: "related-posts",
  imageURL: "/images/cms/blocks/related_posts.jpg",
  imageAltText: "Related Posts",
  labels: {
    singular: {
      en: "Related Posts",
    },
    plural: {
      en: "Related Posts",
    },
  },
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
      name: "number",
      label: "Number of Posts to Show",
      required: true,
      type: "number",
      min: 1,
      max: 3,
      defaultValue: 3,
    },
  ],
};

export default RelatedPosts;
