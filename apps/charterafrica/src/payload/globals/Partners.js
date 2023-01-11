const Partners = {
  slug: "Partners",
  label: {
    en: "Partners",
    fr: "Partenaires",
  },
  fields: [
    {
      name: "partners",
      label: {
        en: "Partners",
      },
      type: "array",
      fields: [
        {
          name: "name",
          label: {
            en: "Name",
            pt: "Nome",
            fr: "Nom",
          },
          type: "text",
          localized: true,
          required: true,
        },
        {
          name: "description",
          defaultValue:
            "A consortium of African and European organisations is supporting the implementation of the Fund. Each organisation brings in specific expertise to the initiative, ranging from grassroots digital activism, to civic technology development and data science, policy analysis and democracy support. The consortium can ensure a presence across the African continent and leverage existing networks and partnerships.",
          label: {
            en: "Description",
            pt: "Descrição",
          },
          type: "textarea",
          localized: true,
          required: true,
        },
        {
          name: "partners",
          label: {
            en: "Partners",
          },
          type: "array",
          fields: [
            {
              name: "name",
              label: {
                en: "Name",
                pt: "Nome",
                fr: "Nom",
              },
              type: "text",
              localized: true,
              required: true,
            },
            {
              name: "href",
              label: { en: "href" },
              type: "text",
              localized: true,
              required: true,
            },
            {
              name: "logo",
              required: true,
              localized: true,
              type: "upload",
              relationTo: "media",
              label: {
                en: "Logo",
                pt: "Imagem",
              },
            },
          ],
        },
      ],
    },
  ],
};
export default Partners;
