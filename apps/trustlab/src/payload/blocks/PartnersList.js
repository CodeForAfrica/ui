const PartnersList = {
  slug: "partners-list",
  imageURL: "/images/cms/blocks/partners.png",
  imageAltText:
    "Used in About page to display partner name, logo and description.",
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

export default PartnersList;
