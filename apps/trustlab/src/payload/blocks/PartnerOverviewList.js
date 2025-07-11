const PartnersOverviewList = {
  slug: "partner-overview-list",
  imageURL: "/images/cms/blocks/partner-overview-list.png",
  imageAltText: "Partners Overview",
  labels: {
    singular: {
      en: "Partner Overview List",
    },
    plural: {
      en: "Partner Overview Lists",
    },
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "partners",
      type: "relationship",
      relationTo: "partners",
      hasMany: true,
      admin: {
        isSortable: true,
      },
    },
  ],
};

export default PartnersOverviewList;
