const Media = {
  slug: "media",
  admin: {
    useAsTitle: "alt",
  },
  access: {
    read: () => true, // Everyone can read Media
    create: () => true,
  },
  upload: {
    staticURL: "/media",
    staticDir: "media",
  },
  fields: [
    {
      name: "alt",
      label: "Alt Text",
      type: "text",
      required: true,
    },
  ],
};

export default Media;
