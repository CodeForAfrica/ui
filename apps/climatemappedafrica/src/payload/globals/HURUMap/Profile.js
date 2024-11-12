import HURUmapURL from "../../fields/HURUmapURL";
import LocationSelect from "../../fields/LocationSelect";
import ProfileSelect from "../../fields/ProfileSelect";

const Profile = {
  label: "Profile",
  fields: [
    {
      name: "url",
      label: "HURUMap NG URL",
      type: "text",
      admin: {
        condition: (_, siblingData) => !!siblingData?.enabled,
        components: {
          Field: HURUmapURL,
        },
        description:
          "The base URL for the HURUmap API. For example, https://hurumap.org/api/v1",
      },
      required: true,
    },
    {
      name: "urlValid",
      type: "checkbox",
      admin: {
        hidden: true,
        readOnly: true,
        condition: (_, siblingData) => !!siblingData?.enabled,
      },
    },
    {
      name: "profile",
      type: "number",
      label: {
        en: "Profile to Use",
      },
      required: true,
      hasMany: false,
      admin: {
        components: {
          Field: ProfileSelect,
        },
        condition: (_, siblingData) => !!siblingData?.urlValid,
      },
    },
    {
      name: "rootGeography",
      label: {
        en: "Root Geography",
      },
      type: "group",
      admin: {
        condition: (_, siblingData) => !!siblingData?.urlValid,
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
    {
      name: "page",
      label: {
        en: "Show on Page",
      },
      localized: true,
      type: "relationship",
      relationTo: ["pages"],
      maxDepth: 1,
      required: true,
      admin: {
        description: "The page to show the HURUmap profile on.",
      },
    },
  ],
};

export default Profile;
