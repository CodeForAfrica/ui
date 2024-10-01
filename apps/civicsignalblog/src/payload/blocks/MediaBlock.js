import blockFields from "#civicsignalblog/payload/fields/blockFields";

const MediaBlock = {
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
