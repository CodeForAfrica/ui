import isAdminOrEditor from "#civicsignalblog/payload/access/isAdminOrEditor";

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
    update: isAdminOrEditor,
    create: isAdminOrEditor,
    delete: isAdminOrEditor,
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
