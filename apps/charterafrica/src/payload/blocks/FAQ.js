import accordion from "../fields/accordion";

const FAQ = {
  slug: "faq",
  labels: {
    singular: {
      en: "Frequently Asked Questions",
      fr: "Foire aux Questions",
      pt: "Perguntas Frequentes",
    },
    plural: {
      en: "Frequently Asked Questions",
      fr: "Foire aux Questions",
      pt: "Perguntas Frequentes",
    },
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
      required: true,
      localized: true,
    },
    accordion(),
  ],
};

export default FAQ;
