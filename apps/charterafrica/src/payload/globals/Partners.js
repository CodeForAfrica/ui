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
    },
  },
  ...linkField.fields,
];

partnerGroup.fields = [linkField];

const Partners = {
  slug: "Partners",
  label: {
    en: "Partners",
    fr: "Partenaires",
  },
  fields: [
    {
      name: "partnerGroups",
      label: {
        en: "Partner Groups",
        fr: "Partner Groups",
      },
      type: "array",
      fields: [
        {
          name: "name",
          label: {
            en: "Name",
            pt: "Nome",
            fr: "Nom",
          },
          type: "text",
          localized: true,
          required: true,
        },
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
        { ...partnerGroup },
      ],
    },
  ],
};
export default Partners;
