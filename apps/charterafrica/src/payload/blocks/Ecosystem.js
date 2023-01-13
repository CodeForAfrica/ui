const Ecosystem = {
  slug: "ecosystem",
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
      minRows: 2,
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
          localized: true,
        },
        {
          name: "data",
          type: "array",
          minRows: 1,
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
              localized: true,
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
              localized: true,
            },
            {
              name: "value",
              type: "number",
              required: true,
              min: 0,
              max: 100,
              label: {
                en: "Value",
                fr: "Valeur",
                pt: "Valor",
              },
              localized: false, // standardized number values don't need to be localized
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
              localized: false, // since we're using a color picker, we don't need to localize this
            },
          ],
        },
      ],
    },
  ],
};

export default Ecosystem;
