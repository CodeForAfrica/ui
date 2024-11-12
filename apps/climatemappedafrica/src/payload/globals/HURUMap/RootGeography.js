import LocationSelect, { validateLocation } from "../../fields/LocationSelect";

const RootGeography = {
  label: "Root Geography",
  fields: [
    {
      name: "rootGeography",
      label: {
        en: "Root Geography",
      },
      type: "group",
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
        {
          name: "zoom",
          type: "group",
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "desktop",
                  label: "Zoom Level for Desktop",
                  type: "number",
                  defaultValue: 3.05,
                  required: true,
                  admin: {
                    description:
                      "Indicates how the map should appear on desktop devices",
                  },
                },
                {
                  name: "mobile",
                  label: "Zoom Level for Mobile",
                  type: "number",
                  required: true,
                  defaultValue: 2.7,
                  admin: {
                    description:
                      "Indicates how the map should appear on small devices",
                  },
                },
              ],
            },
          ],
          admin: {
            hideGutter: true,
          },
        },
      ],
    },
  ],
};

export default RootGeography;
