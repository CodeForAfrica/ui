import { Block } from "payload";

const Partners: Block = {
  slug: "our-partners",
  imageURL: "/images/cms/blocks/codeforafrica/partners.png",
  imageAltText: "Our partners.",
  labels: {
    singular: {
      en: "Partners",
    },
    plural: {
      en: "Partners",
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

export default Partners;
