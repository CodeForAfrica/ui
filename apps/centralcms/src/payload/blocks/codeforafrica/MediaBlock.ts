import blockFields from "@/payload/fields/blockFields";
import { Block } from "payload";

const MediaBlock: Block = {
  slug: "mediaBlock",
  fields: [
    blockFields({
      name: "mediaBlockFields",
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
    }),
  ],
};

export default MediaBlock;
