import type { CollectionConfig } from "payload";
import { canRead } from "@/payload/access/codeforafrica";

const Media: CollectionConfig = {
  slug: "media",
  admin: {
    defaultColumns: ["alt", "updatedAt"],
    enableRichTextLink: false,
    group: "Publication",
    useAsTitle: "alt",
  },
  access: {
    read: canRead,
    create: () => true,
    update: () => true,
  },
  upload: {
    //staticURL: "/media",
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
