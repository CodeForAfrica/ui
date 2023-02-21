import linkGroup from "../fields/linkGroup";
import richText from "../fields/richText";

const CommunityPlatforms = {
  slug: "community-platforms",
  labels: {
    singular: {
      en: "Community Platform",
      fr: "Plateforme Communautaire",
      pt: "Plataforma Comunitária",
    },
    plural: {
      en: "Community Platforms",
      fr: "Plateformes Communautaires",
      pt: "Plataformas Comunitárias",
    },
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "updatedAt"],
  },
  access: {
    read: () => true, // Everyone can read Pages
  },
  fields: [
    {
      name: "name",
      label: {
        en: "Name",
        fr: "Nom",
        pt: "Nome",
      },
      type: "text",
      localized: true,
      required: true,
    },
    richText({
      name: "description",
      label: {
        en: "Description",
        fr: "La description",
        pt: "Descrição",
      },
      localized: true,
      required: true,
      admin: {
        elements: [],
        leaves: ["bold", "code", "italic", "strikethrough", "underline"],
      },
    }),
    {
      name: "icon",
      label: {
        en: "Icon",
        fr: "Icône",
        pt: "Ícone",
      },
      type: "upload",
      relationTo: "media",
      required: true,
      filterOptions: {
        mimeType: { contains: "image" },
      },
    },
    linkGroup(),
    {
      name: "background",
      type: "group",
      label: {
        en: "Background",
        fr: "Fond",
        pt: "Fundo",
      },
      required: true,
      fields: [
        {
          name: "color",
          label: {
            en: "Color",
            fr: "Couleur",
            pt: "Cor",
          },
          type: "text",
          required: true,
        },
        {
          name: "image",
          label: {
            en: "Image",
            fr: "Image",
            pt: "Imagem",
          },
          type: "upload",
          relationTo: "media",
          required: true,
          filterOptions: {
            mimeType: { contains: "image" },
          },
        },
      ],
    },
  ],
};

export default CommunityPlatforms;
