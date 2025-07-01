import { image } from "@/commons-ui/payload/fields";

const Gallery = {
  slug: "gallery",
  imageURL: "/images/cms/blocks/gallery.png",
  imageAltText: "Used in Single Post.",
  labels: {
    singular: {
      en: "Gallery",
    },
    plural: {
      en: "Gallery",
    },
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: { en: "Title" },
      admin: {
        description: "The title of the gallery.",
      },
    },
    {
      name: "images",
      type: "array",
      required: true,
      label: { en: "Images" },
      fields: [
        image({
          name: "image",
          required: true,
          label: { en: "Image" },
        }),
      ],
    },
  ],
};

export default Gallery;
