const Donors = {
  slug: "donor-overview",
  imageURL: "/images/cms/blocks/partners.png",
  imageAltText: "Donors overview",
  labels: {
    singular: {
      en: "Donors",
    },
    plural: {
      en: "Donors",
    },
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "donors",
      type: "relationship",
      relationTo: "donors",
      hasMany: true,
      admin: {
        isSortable: true,
      },
    },
  ],
};

export default Donors;
