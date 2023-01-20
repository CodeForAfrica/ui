import link from "../fields/link";
import linkGroup from "../fields/linkGroup";

const partnerGroup = linkGroup();

const linkField = link();
linkField.fields = [
  {
    name: "logo",
    required: true,
    localized: true,
    type: "upload",
    relationTo: "media",
    label: {
      en: "Logo",
      pt: "Imagem",
      fr: "Image",
    },
  },
  ...linkField.fields,
];

partnerGroup.fields = [linkField];

const Partners = {
  slug: "partners",
  labels: {
    singular: {
      en: "Partner",
      fr: "Partenaire",
    },
    plural: {
      en: "Partners",
      fr: "Partenaires",
    },
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "updatedAt"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "name",
          label: {
            en: "Name",
            fr: "Nom",
            pt: "Nome",
          },
          type: "text",
          localized: true,
          required: true,
          admin: {
            width: "50%",
          },
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "description",
          label: {
            en: "Description",
            fr: "La description",
            pt: "Descrição",
          },
          type: "richText",
          admin: {
            elements: ["h2", "h3", "h4", "h5", "h6", "ol", "ul", "link"],
          },
          localized: true,
          required: true,
        },
      ],
    },
    {
      type: "array",
      name: "partners",
      fields: [partnerGroup],
    },
  ],
};

export default Partners;
