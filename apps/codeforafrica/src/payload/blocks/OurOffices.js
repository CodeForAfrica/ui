const OurOffices = {
  slug: "our-offices",
  imageURL: "/images/cms/blocks/our_offices.png",
  imageAltText: "Our offices",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      type: "relationship",
      relationTo: "offices",
      hasMany: true,
      name: "offices",
      required: true,
    },
  ],
};

export default OurOffices;
