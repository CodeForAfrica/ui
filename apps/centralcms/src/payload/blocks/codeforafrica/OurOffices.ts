import { Block } from "payload";

const OurOffices: Block = {
  slug: "our-offices",
  imageURL: "/images/cms/blocks/codeforafrica/our_offices.png",
  imageAltText: "Our offices",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      hasMany: true,
      type: "relationship",
      relationTo: "offices",
      name: "offices",
      required: true,
    },
  ],
};

export default OurOffices;
