import richText from "../fields/richText";

const Consultations = {
  slug: "consultations",
  fields: [
    richText({
      name: "description",
      label: {
        en: "Description",
        fr: "Description",
        pt: "Descrição",
      },
      required: true,
      localized: true,
      admin: {
        elements: [],
        leaves: ["bold", "italic", "underline"],
      },
    }),
    {
      name: "collection",
      label: {
        en: "Item",
        fr: "Article",
        pt: "Item",
      },
      type: "select",
      options: [
        {
          label: "Documents",
          value: "documents",
        },
        {
          label: "Youtube",
          value: "youtube",
        },
      ],
    },
  ],
};

export default Consultations;
