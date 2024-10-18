const HURUMap = {
  slug: "settings-hurumap",
  label: "HURUMap",
  access: {
    read: () => true,
  },
  admin: {
    group: "Settings",
  },
  fields: [
    {
      name: "page",
      label: "Explore Page",
      type: "relationship",
      relationTo: ["pages"],
      maxDepth: 1,
      required: true,
    },
  ],
};

export default HURUMap;
