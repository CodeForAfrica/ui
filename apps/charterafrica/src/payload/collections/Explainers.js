import richText from "../fields/richText";

const Explainers = {
  slug: "explainers",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "updatedAt"],
  },
  access: {
    read: () => true, // Everyone can read Media
  },
  fields: [
    {
      name: "title",
      label: {
        en: "Title",
        fr: "Titre",
        pt: "Título",
      },
      type: "text",
      localized: true,
      required: true,
    },
    richText({
      name: "description",
      label: {
        en: "Description",
        fr: "La description",
        pt: "Descrição",
      },
      localized: true,
      required: true,
      admin: {
        elements: [],
      },
    }),
    {
      name: "image",
      label: {
        en: "Image",
        pt: "Imagem",
        fr: "Image",
      },
      type: "upload",
      relationTo: "media",
      localized: true,
      required: true,
      filterOptions: {
        mimeType: { contains: "image" },
      },
    },
  ],
};

export default Explainers;
