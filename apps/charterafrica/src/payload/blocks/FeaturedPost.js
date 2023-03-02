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
  fields: [
    {
      name: "featuredPost",
      label: {
        en: "Featured Post",
        pt: "Postagem em destaque",
        fr: "Après sélectionnée",
      },
      type: "relationship",
      relationTo: ["news", "research"],
      required: true,
    },
  ],
};

export default FeaturedPost;
