import { Block } from "payload";

export const MediaBlock: Block = {
  slug: "mediaBlock",
  fields: [
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
      filterOptions: {
        mimeType: { contains: "image" },
      },
    },
  ],
};
