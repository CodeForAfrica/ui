import tags from "../fields/tags";

const OurWorkShowcase = {
  slug: "our-work-showcase",
  imageURL: "/images/cms/blocks/our-work-showcase.png",
  imageAltText: "Our Team",
  labels: {
    singular: {
      en: "Our Work Showcase",
    },
    plural: {
      en: "Our Work Showcase",
    },
  },
  fields: [
    tags({
      name: "defaultTag",
      label: {
        en: "Default Tag",
      },
      hasMany: false,
      admin: {
        position: "sidebar",
      },
    }),
  ],
};

export default OurWorkShowcase;
