import { image } from "@/commons-ui/payload/fields";

const HorizontalGallery = {
  slug: "horizontal-gallery",
  imageURL: "/images/cms/blocks/horizontal-gallery.png",
  imageAltText: "A horizontally scrollable image gallery with dot navigation.",
  labels: {
    singular: {
      en: "Horizontal Gallery",
    },
    plural: {
      en: "Horizontal Gallery",
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

export default HorizontalGallery;
