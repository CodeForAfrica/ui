import accordion from "../fields/accordion";

const GuidingPrincipals = {
  slug: "guiding-principles",
  labels: {
    singular: {
      en: "Guiding Principles",
      fr: "Principes Directeurs",
      pt: "Princípios Orientadores",
    },
    plural: {
      en: "Guiding Principles",
      fr: "Principes Directeurs",
      pt: "Princípios Orientadores",
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

export default GuidingPrincipals;
