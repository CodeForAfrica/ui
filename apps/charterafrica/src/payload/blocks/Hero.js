import link from "../fields/link";
import richText from "../fields/richText";

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
          localized: false,
        },
        richText({
          name: "content",
          required: true,
          admin: {
            elements: ["h2", "h3", "h4", "h5", "h6", "link"],
            leaves: ["bold", "italic", "underline", "code"],
          },
          localized: true,
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
          localized: false,
        },
        {
          name: "content",
          type: "text",
          required: true,
          localized: true,
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
          localized: false,
        },
        {
          name: "color",
          type: "text",
          required: true,
          localized: false,
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
              localized: false,
            },
            {
              name: "content",
              type: "text",
              required: true,
              localized: true,
            },
            {
              name: "icon",
              type: "relationship",
              relationTo: "media",
              hasMany: false,
              required: true,
            },
            link({}),
          ],
        },
      ],
    },
  ],
};

export default Hero;
