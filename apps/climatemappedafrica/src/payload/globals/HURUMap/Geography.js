import LocationSelect, { validateLocation } from "../../fields/LocationSelect";

const Geography = {
  label: "Geography",
  fields: [
    {
      name: "rootGeography",
      label: {
        en: "Root Geography",
      },
      type: "group",
      localized: true,
      fields: [
        {
          name: "code",
          type: "text",
          label: {
            en: "Location Code",
          },
          localized: true,
          required: true,
          hasMany: false,
          defaultValue: "af",
          validate: validateLocation,
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
          name: "rootGeographyHasData",
          type: "checkbox",
          localized: true,
          label: {
            en: "Root geography has data",
          },
          defaultValue: false,
          admin: {
            description:
              "Indicates whether the root geography itself has data. If checked, pinning will be enabled; if unchecked, only child locations will have data and pinning will be disabled.",
          },
        },
      ],
    },
  ],
};

export default Geography;
