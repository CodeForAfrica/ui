import { NEWS } from "../../utils/pageBlocks";
import featuredPost from "../fields/featuredPost";
import title from "../fields/title";

const OurNews = {
  slug: NEWS,
  labels: {
    singular: {
      en: "News",
      fr: "Informations",
      pt: "Pesquisas",
    },
    plural: {
      en: "News",
      fr: "Informations",
      pt: "Pesquisas",
    },
  },
  fields: [title(), featuredPost({ relationTo: ["news"] })],
};

export default OurNews;
