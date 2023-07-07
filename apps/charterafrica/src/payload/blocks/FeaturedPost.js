import featuredPost from "../fields/featuredPost";

const FeaturedPost = {
  slug: "featured-post",
  labels: {
    singular: {
      en: "Featured Post",
      pt: "Postagem em destaque",
      fr: "Après sélectionnée",
    },
    plural: {
      en: "Featured Post",
      pt: "Postagem em destaque",
      fr: "Après sélectionnée",
    },
  },
  fields: [featuredPost()],
};

export default FeaturedPost;
