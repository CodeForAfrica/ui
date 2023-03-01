import fields from "../fields/post";

const Research = {
  slug: "research",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "author", "publishedOn"],
  },
  access: {
    read: () => true,
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: "title",
      label: {
        en: "Title",
        fr: "Titre",
        pt: "Título",
      },
      type: "text",
      localized: true,
      required: true,
    },
    slug(),
    {
      name: "authors",
      required: true,
      type: "relationship",
      relationTo: "author",
      hasMany: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "coverImage",
      label: {
        en: "Cover Image",
        pt: "Imagem de capa",
        fr: "Image de couverture",
      },
      type: "upload",
      relationTo: "media",
      required: true,
      filterOptions: {
        mimeType: { contains: "image" },
      },
    },
    richText({
      name: "excerpt",
      label: {
        en: "Excerpt",
        fr: "Extrait",
        pt: "Excerto",
      },
      localized: true,
      admin: {
        elements: ["leaves"],
      },
    }),
    {
      name: "tags",
      required: true,
      type: "relationship",
      relationTo: "tag",
      hasMany: true,
    },
    content(),
    {
      name: "publishedOn",
      type: "date",
      required: true,
      hooks: {
        beforeValidate: [({ value }) => new Date(value)],
      },
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
        position: "sidebar",
      },
    },
  ],
};

export default Research;
