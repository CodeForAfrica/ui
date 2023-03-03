import authors from "../fields/authors";
import content from "../fields/content";
import publishedOn from "../fields/publishedOn";
import richText from "../fields/richText";
import slug from "../fields/slug";
import tags from "../fields/tags";

const News = {
  slug: "news",
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
    tags({ collectionType: "news" }),
    content(),
    publishedOn(),
  ],
};

export default News;
