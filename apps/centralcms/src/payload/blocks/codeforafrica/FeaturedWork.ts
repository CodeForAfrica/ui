import tags from "@/payload/fields/tags";
import { Block } from "payload";

const FeaturedWork: Block = {
  slug: "featured-work",
  imageURL: "/images/cms/blocks/codeforafrica/our-work-showcase.png",
  imageAltText: "Featured Work",
  fields: [
    tags({
      name: "defaultTag",
      label: {
        en: "Default Tag",
      },
      hasMany: false,
    }),
    {
      name: "projects",
      type: "relationship",
      relationTo: "projects",
      hasMany: true,
      required : true,
      admin: {
        isSortable: true,
      },
    },
  ],
};

export default FeaturedWork;
