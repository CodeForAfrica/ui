import richText from "../fields/richText";

const Explainers = {
  slug: "explainers",
  admin: {
    useAsTitle: "title",
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
      admin: {
        elements: [],
      },
      localized: true,
      required: true,
    }),
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      localized: true,
      required: true,
      filterOptions: {
        mimeType: { contains: "image" },
      },
      label: {
        en: "Image",
        pt: "Imagem",
        fr: "Image",
      },
    },
  ],
};

export default Explainers;
