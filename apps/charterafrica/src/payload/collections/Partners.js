import linkGroup from "../fields/linkGroup";
import richText from "../fields/richText";

const Partners = {
  slug: "partners",
  labels: {
    singular: {
      en: "Partner",
      fr: "Partenaire",
      pt: "Parceiro",
    },
    plural: {
      en: "Partners",
      fr: "Partenaires",
      pt: "Parceiros",
    },
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["name", "updatedAt"],
  },
  access: {
    read: () => true,
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
    {
      name: "partners",
      type: "array",
      fields: [
        {
          name: "name",
          label: {
            en: "Name",
            fr: "Nom",
            pt: "Nome",
          },
          type: "text",
          required: true,
          localized: true,
        },
        {
          name: "logo",
          required: true,
          type: "upload",
          relationTo: "media",
          label: {
            en: "Logo",
            pt: "Imagem",
            fr: "Image",
          },
        },
        linkGroup(),
      ],
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
      required: true,
    }),
  ],
};
export default Partners;
