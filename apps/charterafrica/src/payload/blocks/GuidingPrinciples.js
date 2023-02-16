import accordion from "../fields/accordion";

const GuidingPrincipals = {
  slug: "guiding-principals",
  labels: {
    singular: {
      en: "Guiding Principals",
      fr: "Principes Directeurs",
      pt: "Princípios Orientadores",
    },
    plural: {
      en: "Guiding Principals",
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
