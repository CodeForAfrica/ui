const Consortium = {
  label: "Consortium",
  fields: [
    {
      type: "collapsible",
      label: "Partners",
      localized: true,
      fields: [
        {
          name: "partnerTitle",
          type: "text",
          required: true,
        },
        {
          name: "partners",
          type: "relationship",
          relationTo: "partners",
          hasMany: true,
          admin: {
            isSortable: true,
          },
        },
      ],
    },
    {
      type: "collapsible",
      label: "Donors",
      fields: [
        {
          name: "donorTitle",
          type: "text",
          required: true,
          localized: true,
        },
        {
          name: "donors",
          type: "relationship",
          relationTo: "donors",
          hasMany: true,
          admin: {
            isSortable: true,
          },
        },
      ],
    },
  ],
};

export default Consortium;
