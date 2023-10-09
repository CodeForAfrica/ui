const OurAddress = {
  slug: "our-address",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      type: "group",
      name: "map",
      fields: [
        {
          name: "apiKey",
          type: "text",
          required: true,
        },
      ],
    },
    {
      type: "relationship",
      relationTo: "locations",
      hasMany: true,
      name: "addresses",
    },
  ],
};

export default OurAddress;
