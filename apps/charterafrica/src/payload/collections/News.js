import richText from "../fields/richText";

const News = {
  slug: "news",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "author"],
  },
  fields: [
    {
      name: "title",
      type: "text",
      localized: true,
      required: true,
    },
    {
      name: "author",
      type: "text",
      localized: false,
      required: true,
    },
    {
      name: "image",
      label: {
        en: "Image",
        pt: "Imagem",
        fr: "Image",
      },
      type: "upload",
      relationTo: "media",
      required: true,
      filterOptions: {
        mimeType: { contains: "image" },
      },
    },
    richText({
      name: "description",
      label: {
        en: "Description",
        fr: "La description",
        pt: "Descrição",
      },
      localized: true,
      admin: {
        elements: [],
      },
    }),
  ],
};

export default News;
