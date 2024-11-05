import ProfileSelect from "../../fields/ProfileSelect";

const Profile = {
  label: "Profile",
  fields: [
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
      },
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
