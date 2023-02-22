const FeaturedNewsPost = {
  slug: "featured-news-post",
  labels: {
    singular: {
      en: "Featured News Post",
      pt: "Postagem de notícias em destaque",
      fr: "Nouvelles en vedette",
    },
    plural: {
      en: "Featured News Post",
      pt: "Postagem de notícias em destaque",
      fr: "Nouvelles en vedette",
    },
  },
  fields: [
    {
      name: "featuredPost",
      label: {
        en: "Featured News Post",
        pt: "Postagem de notícias em destaque",
        fr: "Nouvelles en vedette",
      },
      type: "relationship",
      relationTo: "news",
      required: true,
    },
  ],
};

export default FeaturedNewsPost;
