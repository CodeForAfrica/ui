import { mapLinkToHrefBeforeValidate } from "../fields/link";
import richText from "../fields/richText";

const mapDocToHref = ({ siblingData, req }) => {
  return mapLinkToHrefBeforeValidate({
    siblingData: {
      ...siblingData,
      doc: { ...siblingData.doc, relationTo: "pages" },
      linkType: "internal",
    },
    req,
  });
};
const Errors = {
  slug: "errors",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["statusCode", "title", "updatedAt"],
  },
  access: {
    read: () => true, // Everyone can read Media
  },
  fields: [
    {
      name: "statusCode",
      label: {
        en: "Status Code",
        fr: "Code d'état",
        pt: "Código de estado",
      },
      type: "number",
      localized: true,
      required: true,
      unique: true,
    },
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
      localized: true,
      required: true,
      admin: {
        elements: [],
      },
    }),
    {
      name: "action",
      localized: true,
      required: true,
      label: {
        en: "Action",
        fr: "Action",
        pt: "Ação",
      },
      type: "group",
      fields: [
        {
          name: "title",
          maxLength: 50,
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
          name: "doc",
          label: {
            en: "Document to link to",
            fr: "Document pour lien vers",
            pt: "Documento para link para",
          },
          type: "relationship",
          relationTo: ["pages"],
          required: false,
          maxDepth: 1,
          admin: {
            description: () => "If left blank, defaults to page reload",
          },
        },
        {
          name: "href",
          type: "text",
          required: true,
          admin: {
            hidden: true,
          },
          hooks: {
            beforeValidate: [mapDocToHref],
          },
        },
      ],
    },
  ],
};

export default Errors;
