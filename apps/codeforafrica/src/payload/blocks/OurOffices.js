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
      relationTo: "locations",
      hasMany: true,
      name: "addresses",
      required: true,
    },
  ],
};

export default OurOffices;
