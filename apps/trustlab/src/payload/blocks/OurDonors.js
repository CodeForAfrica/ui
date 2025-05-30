const Donors = {
  slug: "our-donors",
  imageURL: "/images/cms/blocks/partners.png",
  imageAltText: "Our partners.",
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

export default Donors;
