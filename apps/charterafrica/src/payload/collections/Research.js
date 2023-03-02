import ExternalEmbed from "../blocks/ExternalEmbed";
import MediaBlock from "../blocks/MediaBlock";
import RichText from "../blocks/RichText";
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
      type: "relationship",
      relationTo: "tag",
      hasMany: true,
    },
    {
      name: "content",
      type: "blocks",
      blocks: [RichText, MediaBlock, ExternalEmbed],
      required: true,
    },
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
