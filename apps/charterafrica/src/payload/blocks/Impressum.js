import richText from "../fields/richText";

const Impressum = {
  slug: "impressum",
  fields: [
    richText({
      name: "content",
      label: {
        en: "Content",
      },
      required: true,
      localized: true,
      admin: {
        elements: ["h2", "h3", "h4", "h5", "h6", "link", "ol", "ul", "indent"],
        leaves: ["bold", "italic", "strikethrough", "underline"],
      },
    }),
    {
      name: "image",
      label: {
        en: "Image",
        fr: "Image",
        pt: "Imagem",
      },
      type: "upload",
      relationTo: "media",
      filterOptions: {
        mimeType: { contains: "image" },
      },
    },
  ],
};

export default Impressum;
