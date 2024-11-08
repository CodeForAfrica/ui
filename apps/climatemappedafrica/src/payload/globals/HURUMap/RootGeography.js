import LocationSelect from "../../fields/LocationSelect";

const RootGeography = {
  label: "Root Geography",
  fields: [
    {
      name: "rootGeography",
      label: {
        en: "Root Geography",
      },
      type: "group",
      admin: {
        condition: (data) => Boolean(data?.profile),
      },
      fields: [
        {
          name: "code",
          type: "text",
          label: {
            en: "Location Code",
          },
          required: true,
          hasMany: false,
          defaultValue: "af",
          admin: {
            components: {
              Field: LocationSelect,
            },
          },
        },
        {
          name: "center",
          label: "Center Point",
          type: "point",
          defaultValue: [20.0, 4.25],
        },
        {
          name: "hasData",
          type: "checkbox",
          label: {
            en: "Root geography has data",
          },
          defaultValue: false,
          admin: {
            description:
              "Indicates whether the root geography itself has data that can be used for comparison with its children",
          },
        },
      ],
    },
  ],
};

export default RootGeography;
