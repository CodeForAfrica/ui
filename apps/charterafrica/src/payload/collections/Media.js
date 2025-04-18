import transformDocMediaUrl from "../utils/transformDocMediaUrl";

const Media = {
  slug: "media",
  admin: {
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
      localized: true,
      required: true,
    },
  ],
  hooks: {
    afterRead: [({ doc }) => transformDocMediaUrl(doc)],
  },
};

export default Media;
