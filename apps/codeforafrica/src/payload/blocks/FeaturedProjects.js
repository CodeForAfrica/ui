import tags from "../fields/tags";

const FeaturedProjects = {
  slug: "featured-projects",
  imageURL: "/images/cms/blocks/our-work-showcase.png",
  imageAltText: "Featured Projects",
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
      required: true,
      admin: {
        isSortable: true,
      },
    },
  ],
};

export default FeaturedProjects;
