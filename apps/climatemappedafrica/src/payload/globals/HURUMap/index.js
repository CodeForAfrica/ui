import LocationSelect, { validateLocation } from "../../fields/LocationSelect";

const HURUMap = {
  slug: "settings-hurumap",
  label: "HURUMap",
  description: "HURUMap Configuration",
  access: {
    read: () => true,
  },
  admin: {
    group: "Settings",
    hideAPIURL: true,
  },
  fields: [
    {
      name: "page",
      label: "Explore Page",
      type: "relationship",
      relationTo: ["pages"],
      maxDepth: 1,
      required: true,
      admin: {
        description:
          "The page to use as the Explore page. It will contain the interactive map.",
      },
    },
    {
      name: "initialLocation",
      label: {
        en: "Initial Location",
      },
      type: "group",
      localized: true,
      fields: [
        {
          name: "name",
          type: "text",
          label: {
            en: "Name",
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
          localized: true,
          label: {
            en: "Center",
          },
          type: "point",
          defaultValue: [0.3051933453207569, 37.908818734483155],
        },
      ],
    },
  ],
};

export default HURUMap;
