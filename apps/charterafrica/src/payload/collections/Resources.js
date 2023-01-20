import linkGroup from "../fields/linkGroup";

const Resources = {
  slug: "resources",
  labels: {
    singular: {
      en: "Resource",
      fr: "Ressource",
      pt: "Recurso",
    },
    plural: {
      en: "Resources",
      fr: "Ressources",
      pt: "Recursos",
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
      type: "row",
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
          admin: {
            width: "50%",
          },
        },
        {
          name: "value",
          label: {
            en: "Value",
            fr: "Valeur",
            pt: "Valor",
          },
          type: "number",
          required: true,
          admin: {
            width: "50%",
          },
        },
      ],
    },
    {
      type: "row",
      fields: [
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
      ],
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

export default Resources;
