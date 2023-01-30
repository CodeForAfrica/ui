import richText from "../fields/richText";

const HelpdeskPageHeader = {
  slug: "helpdesk-page-header",
  fields: [
    richText({
      name: "title",
      type: "richText",
      required: true,
      localized: true,
      label: {
        en: "Title",
        fr: "Titre",
        pt: "Título",
      },
      admin: {
        elements: [],
        leaves: ["bold", "italic"],
      },
    }),
    {
      name: "logo",
      label: {
        en: "Logo",
        pt: "Imagem",
        fr: "Logo",
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

export default HelpdeskPageHeader;
