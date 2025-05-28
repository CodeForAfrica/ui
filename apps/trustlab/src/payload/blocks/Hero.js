import { richText, image, link } from "@commons-ui/payload";

const Hero = {
  slug: "hero",
  imageURL: "/images/cms/blocks/hero.png",
  imageAltText: "Used in homepage.",
  fields: [
    {
      name: "slides",
      type: "array",
      label: { en: "Slides" },

      fields: [
        richText({
          name: "title",
          required: true,
        }),
        richText({
          name: "subtitle",
          required: true,
        }),
        richText({
          name: "description",
          required: true,
          admin: {
            description: "A brief description of the slide content.",
          },
        }),
        image({
          overrides: {
            name: "backgroundImage",
            required: true,
          },
        }),
        link({
          name: "buttonLink",
          label: "Button Link",
          required: true,
          admin: {
            description: "The link to navigate to when the button is clicked.",
          },
        }),
      ],
    },
  ],
};

export default Hero;
