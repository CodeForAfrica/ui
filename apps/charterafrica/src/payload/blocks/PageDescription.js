import richText from "../fields/richText";

const PageDescription = {
  slug: "page-description",
  labels: {
    singular: {
      en: "Page Description",
    },
    plural: {
      en: "Page Description",
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
      required: true,
      localized: true,
      admin: {
        elements: [
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
          "link",
          "ol",
          "ul",
          "indent",
        ],
        leaves: ["bold", "code", "italic", "underline"],
      },
    }),
  ],
};

export default PageDescription;
