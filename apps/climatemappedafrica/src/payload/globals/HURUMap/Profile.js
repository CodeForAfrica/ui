import LocationSelect, { validateLocation } from "../../fields/LocationSelect";

const Profile = {
  label: "Profile",
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
          label: "Center Point",
          type: "point",
          defaultValue: [20.0, 4.25],
        },
        {
          name: "pinInitialLocation",
          type: "checkbox",
          localized: true,
          label: {
            en: "Allow pinning of initial location",
          },
          defaultValue: false,
        },
      ],
    },
  ],
};

export default Profile;
