const Media = {
  slug: "media",
  admin: {
    defaultColumns: ["alt", "updatedAt"],
    enableRichTextLink: false,
    group: "Publication",
    useAsTitle: "alt",
  },
  access: {
    read: () => true, // Everyone can read Media
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
  hooks: {
    afterRead: [({ doc }) => ({ ...doc, src: doc.url })],
  },
};

export default Media;
