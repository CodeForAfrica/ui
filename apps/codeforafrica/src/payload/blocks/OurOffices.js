const OurOffices = {
  slug: "our-offices",
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
