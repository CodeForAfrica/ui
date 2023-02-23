import BlogContent from "../blocks/BlogContent";
import MediaBlock from "../blocks/MediaBlock";
import VideoEmbed from "../blocks/VideoEmbed";

import richText from "./richText";
import slug from "./slug";

const setPublishedOn = ({ value }) => {
  return new Date(value);
};

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
  {
    name: "authors",
    required: true,
    type: "relationship",
    relationTo: "author",
    hasMany: true,
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
  }),
  {
    name: "content",
    type: "blocks",
    blocks: [BlogContent, MediaBlock, VideoEmbed],
    required: true,
  },
  {
    name: "publishedOn",
    type: "date",
    hooks: {
      beforeValidate: [setPublishedOn],
    },
    admin: {
      date: {
        pickerAppearance: "dayAndTime",
      },
      position: "sidebar",
    },
  },
];

export default postFields;
