import link from "../fields/link";

const Spotlight = {
  slug: "spotlight",
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
      name: "items",
      type: "array",
      minRows: 1,
      maxRows: 4,
      required: true,
      fields: [
        {
          name: "category",
          type: "text",
          label: {
            en: "Category",
            fr: "Catégorie",
            pt: "Categoria",
          },
          required: false,
          localized: true,
          admin: {
            disabled: true,
          },
        },
        {
          name: "item",
          type: "group",
          label: {
            en: "Item",
            fr: "Objet",
            pt: "Item",
          },
          required: true,
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
            {
              name: "topic",
              type: "text",
              label: {
                en: "Topic",
                fr: "Sujet",
                pt: "Tópico",
              },
              required: true,
              localized: true,
            },
            {
              name: "excerpt",
              type: "text",
              label: {
                en: "Excerpt",
                fr: "Extrait",
                pt: "Excerto",
              },
              required: true,
              localized: true,
            },
            {
              name: "date",
              type: "date",
              label: {
                en: "Date",
                fr: "Date",
                pt: "Encontro",
              },
              required: false,
              admin: {
                disabled: true,
              },
            },
            {
              name: "link",
              type: "group",
              label: {
                en: "Link",
                fr: "Lien",
                pt: "Link",
              },
              required: true,
              fields: [
                link({
                  disableLabel: true,
                }),
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default Spotlight;
