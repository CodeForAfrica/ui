import link from "../fields/link";
import richText from "../fields/richText";

const Hero = {
  slug: "hero",
  fields: [
    {
      name: "slides",
      type: "array",
      minRows: 1,
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
              label: {
                en: "Background Image",
                fr: "Image de fond",
                pt: "Imagem de fundo",
              },
              type: "upload",
              relationTo: "media",
              required: true,
            },
            {
              name: "blendMode",
              type: "text", // TODO: can we make this a select? multiple select?
              required: true,
              localized: false,
            },
            {
              name: "color",
              type: "text", // TODO: make this color picker??
              required: true,
              localized: false,
            },
          ],
        },
        {
          name: "links",
          type: "array",
          minRows: 1,
          maxRows: 2,
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
              type: "upload",
              relationTo: "media",
              required: true,
            },
            link({
              disableLabel: true,
            }),
          ],
        },
      ],
    },
  ],
};

export default Hero;
