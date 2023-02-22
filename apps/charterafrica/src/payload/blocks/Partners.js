import richText from "../fields/richText";

const Partners = {
  slug: "our-partners",
  labels: {
    singular: {
      en: "Partners",
      fr: "Partenaires",
      pt: "Parceiros",
    },
    plural: {
      en: "Partners",
      fr: "Partenaires",
      pt: "Parceiros",
    },
  },
  fields: [
    {
      name: "title",
      label: {
        en: "Title",
        fr: "Titre",
        pt: "Título",
      },
      type: "text",
      localized: true,
      required: true,
    },
    richText({
      name: "description",
      label: {
        en: "Description",
        fr: "La description",
        pt: "Descrição",
      },
      admin: {
        elements: [],
      },
      localized: true,
    }),
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

export default Partners;
