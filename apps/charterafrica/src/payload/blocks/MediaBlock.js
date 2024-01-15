import blockFields from "../fields/blockFields";

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
        {
          name: "caption",
          type: "text",
          label: { en: "Caption", fr: "Légende", pt: "Legenda" },
          required: false,
          localized: true,
        },
      ],
    }),
  ],
};

export default MediaBlock;
