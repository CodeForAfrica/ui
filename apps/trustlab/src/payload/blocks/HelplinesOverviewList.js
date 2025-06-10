const HelplinesOverviewList = {
  slug: "helplines-overview-list",
  imageURL: "/images/cms/blocks/helpline-overview-list.png",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "resources",
      type: "relationship",
      relationTo: "helplines",
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

export default HelplinesOverviewList;
