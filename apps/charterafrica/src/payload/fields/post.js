import linkGroup from "./linkGroup";
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
    type: "textarea",
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
    name: "image",
    label: {
      en: "Image",
      pt: "Imagem",
      fr: "Image",
    },
    type: "upload",
    relationTo: "media",
    required: true,
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
  linkGroup(),
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
