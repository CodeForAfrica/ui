const Donors = {
  slug: "donor-overview-list",
  imageURL: "/images/cms/blocks/donor-overview-list.png",
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
