const Profile = {
  label: "Profile",
  fields: [
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
        description: "The page to show the interactive map on.",
      },
    },
  ],
};

export default Profile;
