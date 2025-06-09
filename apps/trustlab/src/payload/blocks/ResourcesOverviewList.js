const ResourcesOverviewList = {
  slug: "resources-overview-list",
  imageURL: "/images/cms/blocks/resources-overview-list.png",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "resources",
      type: "relationship",
      relationTo: "resources",
      hasMany: true,
      minRows: 1,
      maxRows: 3,
      required: true,
    },
    {
      name: "linkLabel",
      type: "text",
      required: true,
      defaultValue: "Learn more",
    },
  ],
};

export default ResourcesOverviewList;
