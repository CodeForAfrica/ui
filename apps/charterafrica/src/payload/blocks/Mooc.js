import linkGroup from "../fields/linkGroup";

const Mooc = {
  slug: "mooc",
  fields: [
    {
      name: "title",
      type: "richText",
      required: true,
      localized: true,
      admin: {
        elements: ["h1"],
        leaves: ["bold", "italic", "underline", "code"],
      },
    },
    linkGroup({}),
    {
      name: "image",
      label: {
        en: "Image",
        fr: "Image",
        pt: "Imagem",
      },
      type: "upload",
      relationTo: "media",
      required: true,
      filterOptions: {
        mimeType: { contains: "image" },
      },
    },
  ],
};

export default Mooc;
