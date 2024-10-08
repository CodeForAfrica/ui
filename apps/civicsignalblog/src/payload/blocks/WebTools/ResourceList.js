const PageHeader = {
  slug: "webtools-resource-list",
  labels: {
    singular: "Resource List",
    plural: "Resource Lists",
  },
  imageURL: "/images/cms/blocks/resource_list.png",
  imageAltText: "A list of resrouces to display",
  fields: [
    {
      name: "resourceListType",
      type: "select",
      hasMany: false,
      options: [
        {
          label: "Media Data",
          value: "media_data",
        },
      ],
    },
  ],
};

export default PageHeader;
