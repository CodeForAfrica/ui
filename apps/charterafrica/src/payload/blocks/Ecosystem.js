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
          admin: {
            initCollapsed: true,
            components: {
              RowLabel: ({ data }) => {
                return data?.label || data?.id;
              },
            },
          },
        },
      ],
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: ({ data }) => {
            return data?.title || data?.id;
          },
        },
      },
    },
  ],
};

export default Ecosystem;
