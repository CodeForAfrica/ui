import { relationship } from "payload/dist/fields/validations";

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
      validate: (val, args) => {
        const count = val?.length ?? 0;
        if (count > 3 && count % 3 !== 0) {
          const { t } = args;
          return t("charterafrica.site:platformsMultipleOf3");
        }
        return relationship(val, args);
      },
      admin: {
        isSortable: true,
      },
    },
  ],
};

export default CommunityPlatforms;
