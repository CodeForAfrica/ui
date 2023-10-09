const Offices = {
  slug: "offices",
  admin: {
    group: "Settings",
    defaultColumns: ["title"],
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
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
      name: "zipcode",
      type: "text",
    },
    {
      name: "city",
      type: "text",
    },
    {
      name: "country",
      type: "text",
    },
  ],
};

export default Offices;
