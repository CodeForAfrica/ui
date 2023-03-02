import content from "../fields/content";
import richText from "../fields/richText";
import slug from "../fields/slug";

const Fellowships = {
  slug: "fellowships",
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
    {
      name: "category",
      label: {
        en: "Category",
        fr: "Catégorie",
        pt: "Categoria",
      },
      type: "select",
      options: [
        {
          label: {
            en: "Technologies",
            fr: "les technologies",
            pt: "Tecnologias",
          },
          value: "technologies",
        },
        {
          label: {
            en: "Other",
            pt: "Outro",
            fr: "Autre",
          },
          value: "other",
        },
      ],
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
    content(),
    {
      name: "deadline",
      type: "date",
      required: true,
      hooks: {},
      admin: {
        position: "sidebar",
      },
    },
  ],
};

export default Fellowships;
