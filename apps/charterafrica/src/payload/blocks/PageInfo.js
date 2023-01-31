import richText from "../fields/richText";

const PageInfo = {
  slug: "page-info",
  labels: {
    singular: {
      en: "Page info",
      fr: "Page info",
      pt: "Página Info",
    },
    plural: {
      en: "Page info",
      fr: "Page info",
      pt: "Página Info",
    },
  },
  fields: [
    richText({
      name: "description",
      label: {
        en: "Description",
        fr: "La description",
        pt: "Descrição",
      },
      admin: {
        elements: [],
        leaves: ["bold", "italic", "underline", "code"],
      },
      localized: true,
    }),
  ],
};

export default PageInfo;
