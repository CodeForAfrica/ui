const Post = {
  slug: "featured-post",
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
      name: "excerpt",
      type: "richText",
      label: {
        en: "Excerpt",
        fr: "Extrait",
        pt: "Excerto",
      },
      required: true,
      localized: true,
      admin: {
        elements: [],
        leaves: ["bold", "italic", "underline", "code"],
      },
    },
    {
      name: "content",
      type: "richText",
      label: {
        en: "Content",
        fr: "Contenu",
        pt: "Conteúdo",
      },
      required: true,
      localized: true,
      admin: {
        elements: [],
        leaves: ["bold", "italic", "underline", "code"],
      },
    },
    {
      name: "author",
      type: "text",
      label: {
        en: "Author",
        fr: "Auteur",
        pt: "Autor",
      },
    },
    {
      name: "date",
      type: "date",
      label: {
        en: "Date",
        fr: "Date",
        pt: "Data",
      },
      required: true,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      label: {
        en: "Image",
        fr: "Image",
        pt: "Imagem",
      },
      required: true,
    },
    {
      name: "featured",
      type: "radio",
      label: {
        en: "Is Featured",
        fr: "Est-ce que c'est en vedette?",
        pt: "É destaque?",
      },
      options: [
        {
          label: {
            en: "Yes",
            fr: "Oui",
            pt: "Sim",
          },
          value: "True",
        },
        {
          label: {
            en: "No",
            fr: "Non",
            pt: "Não",
          },
          value: "False",
        },
      ],
      defaultValue: "False",
    },
  ],
};

export default Post;
