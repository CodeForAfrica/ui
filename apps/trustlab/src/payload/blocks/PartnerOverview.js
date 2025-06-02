const Partners = {
  slug: "partner-overview",
  imageURL: "/images/cms/blocks/partners.png",
  imageAltText: "Partners Overview",
  labels: {
    singular: {
      en: "Partners",
    },
    plural: {
      en: "Partners",
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

export default Partners;
