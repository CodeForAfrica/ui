import ExternalEmbed from "../blocks/ExternalEmbed";
import MediaBlock from "../blocks/MediaBlock";
import RichText from "../blocks/RichText";

import richText from "./richText";
import slug from "./slug";

const setPublishedOn = ({ value }) => {
  return new Date(value);
};

export const content = (overrides) => ({
  name: "content",
  type: "blocks",
  blocks: [RichText, MediaBlock, ExternalEmbed],
  required: true,
  ...overrides,
});

export const publishedOn = (overrides) => ({
  name: "publishedOn",
  type: "date",
  required: true,
  hooks: {
    beforeValidate: [setPublishedOn],
  },
  admin: {
    date: {
      pickerAppearance: "dayAndTime",
    },
    position: "sidebar",
  },
  ...overrides,
});

export const authors = (overrides) => ({
  name: "authors",
  required: true,
  type: "relationship",
  relationTo: "author",
  hasMany: true,
  admin: {
    position: "sidebar",
  },
  ...overrides,
});

export const tags = (overrides) => ({
  name: "tags",
  required: true,
  type: "relationship",
  relationTo: "tag",
  hasMany: true,
  ...overrides,
});

const postFields = [
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
  authors({ required: false }),
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
  tags(),
  content(),
  publishedOn(),
];

export default postFields;
