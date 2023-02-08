import Article from "../fields/article";

const Research = {
  slug: "research",
  labels: {
    singular: {
      en: "Research",
      fr: "Recherche",
      pt: "Pesquisa",
    },
    plural: {
      en: "Research",
      fr: "Recherches",
      pt: "Pesquisas",
    },
  },
  access: {
    read: () => true,
  },
  fields: [Article()],
};

export default Research;
