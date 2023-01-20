const Resources = {
  slug: "block-partners",
  labels: {
    singular: {
      en: "Partner",
      fr: "Associé",
      pt: "Parceiro",
    },
    plural: {
      en: "Partners",
      fr: "Les partenaires",
      pt: "Parceiros",
    },
  },
  fields: [
    {
      name: "partners",
      label: {
        en: "Partners",
        fr: "Les partenaires",
        pt: "Parceiros",
      },
      type: "relationship",
      relationTo: "partners",
      hasMany: true,
      required: true,
      admin: {
        isSortable: true,
      },
    },
  ],
};

export default Resources;
