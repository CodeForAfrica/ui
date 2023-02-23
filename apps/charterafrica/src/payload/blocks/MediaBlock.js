import blockFields from "../fields/blockFields";

const MediaBlock = {
  slug: "mediaBlock",
  fields: [
    blockFields({
      name: "mediaBlockFields",
      fields: [
        {
          name: "media",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    }),
  ],
};

export default MediaBlock;
