import { authors, content, publishedOn, tags } from "../fields/post";
import richText from "../fields/richText";
import slug from "../fields/slug";

const Research = {
  slug: "research",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "authors", "publishedOn"],
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
    authors(),
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
    tags({ required: false }),
    content(),
    publishedOn(),
  ],
};

export default Research;
