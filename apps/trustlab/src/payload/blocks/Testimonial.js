import { richText, image } from "@commons-ui/payload";

const Testimonial = {
  slug: "testimonial",
  imageURL: "/images/cms/blocks/testimonial.png",
  imageAltText: "Testimonial / Participants Reflection block.",
  labels: { singular: "Testimonial", plural: "Testimonials" },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
      label: "Title",
    },
    richText({ name: "content", required: true, localized: true }),
    image({
      overrides: {
        name: "logo",
        label: "Organisation Logo",
        required: false,
      },
    }),
    image({
      overrides: {
        name: "image",
        label: "Decorative Image",
        required: false,
      },
    }),
  ],
};

export default Testimonial;
