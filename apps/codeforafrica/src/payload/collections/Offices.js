const Offices = {
  slug: "offices",
  admin: {
    group: "Organisation",
    defaultColumns: ["city", "country"],
    useAsTitle: "city",
  },
  fields: [
    {
      name: "city",
      type: "text",
      required: true,
    },
    {
      name: "location",
      type: "point",
      label: "Location",
      required: true,
    },
    {
      name: "addressLine1",
      type: "text",
    },
    {
      name: "addressLine2",
      type: "text",
    },
    {
      name: "zipCode",
      type: "text",
    },
    {
      name: "country",
      type: "text",
    },
  ],
};

export default Offices;
