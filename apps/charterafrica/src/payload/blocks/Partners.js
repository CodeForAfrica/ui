import richText from "../fields/richText";

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

export default Resources;
