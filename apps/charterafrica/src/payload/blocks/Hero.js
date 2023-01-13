import link from "../fields/link";
import richText from "../fields/richText";

const heroLink = link({
  overrides: {
    // TODO: find a way to rename link
  },
});

const Hero = {
  slug: "hero",
  fields: [
    {
      name: "title",
      type: "group",
      required: true,
      fields: [
        {
          name: "color",
          type: "text",
          required: true,
        },
        richText({
          name: "content",
          required: true,
          admin: {
            elements: ["h2", "h3", "h4", "h5", "h6", "link"],
            leaves: ["bold", "italic", "underline", "code"],
          },
        }),
      ],
    },
    {
      name: "subheading",
      type: "group",
      required: true,
      fields: [
        {
          name: "color",
          type: "text",
          required: true,
        },
        {
          name: "content",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "background",
      type: "group",
      required: true,
      fields: [
        {
          name: "src",
          label: "Background Image",
          type: "relationship",
          relationTo: "media",
          hasMany: false,
          required: true,
        },
        {
          name: "blendMode",
          type: "text",
          required: true,
        },
        {
          name: "color",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "links",
      type: "array",
      minRows: 1,
      fields: [
        {
          name: "button",
          type: "group",
          required: true,
          fields: [
            {
              name: "color",
              type: "text",
              required: true,
            },
            {
              name: "content",
              type: "text",
              required: true,
            },
            {
              name: "icon",
              type: "relationship",
              relationTo: "media",
              hasMany: false,
              required: true,
            },
            heroLink,
          ],
        },
      ],
    },
  ],
};

export default Hero;
