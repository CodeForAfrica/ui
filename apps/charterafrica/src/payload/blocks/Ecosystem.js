const Ecosystem = {
  slug: "ecosystem",
  label: {
    en: "Ecosystem",
    fr: "Écosystème",
    pt: "Ecossistema",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "items",
      type: "array",
      label: {
        en: "Items",
        fr: "Articles",
        pt: "Itens",
      },
      required: true,
      maxRows: 2,
      fields: [
        // TODO: Look into how to enforce only the required types. Ecosystem should only allow 2 items, Tools and People
        {
          name: "title",
          type: "text",
          label: {
            en: "Title",
            fr: "Titre",
            pt: "Título",
          },
          required: true,
        },
        {
          name: "data",
          type: "array",
          fields: [
            {
              name: "id",
              type: "text",
              label: {
                en: "ID",
                fr: "ID",
                pt: "ID",
              },
              required: true,
            },
            {
              name: "label",
              type: "text",
              label: {
                en: "Label",
                fr: "Étiquette",
                pt: "Rótulo",
              },
              required: true,
            },
            {
              name: "value",
              type: "number",
              min: 0,
              max: 100,
              label: {
                en: "Value",
                fr: "Valeur",
                pt: "Valor",
              },
            },
            {
              name: "color",
              type: "text",
              label: {
                en: "Color",
                fr: "Couleur",
                pt: "Cor",
              },
              required: true,
            },
          ],
        },
      ],
    },
  ],
};

export default Ecosystem;
