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
        width: "50%",
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
          type: "row",
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
          ],
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
        width: "50%",
      },
    },
  ],
};

export default Profile;
