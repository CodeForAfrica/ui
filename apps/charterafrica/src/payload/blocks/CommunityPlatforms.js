const CommunityPlatforms = {
  slug: "our-community-platforms",
  labels: {
    singular: {
      en: "Community Platforms",
      fr: "Plateformes Communautaires",
      pt: "Plataformas Comunitárias",
    },
    plural: {
      en: "Community Platforms",
      fr: "Plateformes Communautaires",
      pt: "Plataformas Comunitárias",
    },
  },
  fields: [
    {
      name: "items",
      label: {
        en: "Platform",
        fr: "Plateforme",
        pt: "Plataforma",
      },
      type: "relationship",
      relationTo: "community-platforms",
      hasMany: true,
      required: true,
      admin: {
        isSortable: true,
      },
    },
  ],
};

export default CommunityPlatforms;
