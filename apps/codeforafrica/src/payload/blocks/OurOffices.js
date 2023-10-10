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
      hasMany: true,
      type: "relationship",
      relationTo: "offices",
      name: "offices",
      required: true,
    },
  ],
};

export default OurOffices;
