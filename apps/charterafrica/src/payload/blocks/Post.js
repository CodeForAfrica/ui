const Post = {
  slug: "featured-post",
  fields: [
    {
      name: "title",
      type: "text",
      label: {
        en: "Title",
        fr: "Titre",
        pt: "Título",
      },
      required: true,
      localized: true,
    },
    {
      name: "excerpt",
      type: "richText",
      label: {
        en: "Excerpt",
        fr: "Extrait",
        pt: "Excerto",
      },
      required: true,
      localized: true,
      admin: {
        elements: [],
        leaves: ["bold", "italic", "underline", "code"],
      },
    },
    {
      name: "date",
      type: "date",
      label: {
        en: "Date",
        fr: "Date",
        pt: "Data",
      },
      required: true,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      label: {
        en: "Image",
        fr: "Image",
        pt: "Imagem",
      },
      required: true,
    },
  ],
};

export default Post;
