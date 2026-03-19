import { richText } from "@commons-ui/payload";

const Testimonial = {
  slug: "testimonial",
  labels: { singular: "Testimonial", plural: "Testimonials" },
  imageURL: "/images/cms/blocks/testimonial.png",
  fields: [
    {
      name: "title",
      type: "text",
      label: { en: "Title" },
      localized: true,
    },
    richText({
      name: "description",
      label: { en: "Description" },
      required: true,
      localized: true,
    }),
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      label: { en: "Image" },
    },
    {
      name: "signatureIcon",
      type: "upload",
      relationTo: "media",
      label: { en: "Signature Icon" },
      admin: {
        description: "Logo or signature image displayed below the description",
      },
    },
  ],
};

export default Testimonial;
