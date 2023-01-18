import link from "../fields/link";
import richText from "../fields/richText";

const blendModeOptions = [
  {
    label: "Normal",
    value: "normal",
  },
  {
    label: "Multiply",
    value: "multiply",
  },
  {
    label: "Screen",
    value: "screen",
  },
  {
    label: "Overlay",
    value: "overlay",
  },
  {
    label: "Darken",
    value: "darken",
  },
  {
    label: "Lighten",
    value: "lighten",
  },
  {
    label: "Color Dodge",
    value: "color-dodge",
  },
  {
    label: "Color Burn",
    value: "color-burn",
  },
  {
    label: "Hard Light",
    value: "hard-light",
  },
  {
    label: "Soft Light",
    value: "soft-light",
  },
  {
    label: "Difference",
    value: "difference",
  },
  {
    label: "Exclusion",
    value: "exclusion",
  },
  {
    label: "Hue",
    value: "hue",
  },
  {
    label: "Saturation",
    value: "saturation",
  },
  {
    label: "Color",
    value: "color",
  },
  {
    label: "Luminosity",
    value: "luminosity",
  },
  {
    label: "Initial",
    value: "initial",
  },
  {
    label: "Inherit",
    value: "inherit",
  },
  {
    label: "Unset",
    value: "unset",
  },
  {
    label: "Revert",
    value: "revert",
  },
  {
    label: "Revert Layer",
    value: "revert-layer",
  },
];

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
              name: "color",
              type: "text",
              required: true,
              localized: false,
            },
            {
              name: "blendMode",
              type: "select",
              required: true,
              hasMany: true,
              options: blendModeOptions,
              admin: {
                isClearable: true,
                isSortable: true,
              },
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
