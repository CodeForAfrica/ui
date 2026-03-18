const FeatureList = {
  slug: "feature-list",
  imageURL: "/images/cms/blocks/feature-list.png",
  imageAltText: "Feature List block.",
  labels: { singular: "Feature List", plural: "Feature Lists" },
  fields: [
    {
      name: "title",
      type: "text",
      localized: true,
      label: "Section Title",
    },
    {
      name: "description",
      type: "textarea",
      localized: true,
      label: "Section Description",
    },
    {
      name: "items",
      type: "array",
      label: "Items",
      required: true,
      minRows: 1,
      maxRows: 4,
      localized: true,
      fields: [
        { name: "title", type: "text", required: true, label: "Title" },
        {
          name: "description",
          type: "textarea",
          required: true,
          label: "Description",
        },
      ],
    },
  ],
};

export default FeatureList;
