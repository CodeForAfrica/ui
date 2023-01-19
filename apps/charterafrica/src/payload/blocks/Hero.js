import link from "../fields/link";
import richText from "../fields/richText";
import {
  validateHexColor,
  blendModeOptions,
  MuiButtonColors,
} from "../utils/colors";

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
              validate: validateHexColor,
              required: true,
              label: {
                en: "Title Color",
                fr: "Couleur du titre",
                pt: "Cor do título",
              },
            },
            richText({
              name: "content",
              required: true,
              admin: {
                elements: ["h2", "h3", "h4", "h5", "h6", "link"],
                leaves: ["bold", "italic", "underline", "code"],
              },
              localized: true,
              label: {
                en: "Title",
                fr: "Titre",
                pt: "Título",
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
              validate: validateHexColor,
              required: true,
              label: {
                en: "Subheading Color",
                fr: "Couleur du sous-titre",
                pt: "Cor do subtítulo",
              },
            },
            {
              name: "content",
              type: "text",
              required: true,
              localized: true,
              label: {
                en: "Subheading",
                fr: "Sous-titre",
                pt: "Subtítulo",
              },
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
              validate: validateHexColor,
              type: "text",
              required: true,
              label: {
                en: "Background Color",
                fr: "Couleur de fond",
                pt: "Cor de fundo",
              },
            },
            {
              name: "blendMode",
              type: "select",
              required: true,
              hasMany: true,
              options: blendModeOptions,
              label: {
                en: "Blend Mode",
                fr: "Mode de fusion",
                pt: "Modo de fusão",
              },
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
              type: "select",
              options: MuiButtonColors,
              required: true,
              label: {
                en: "Button Color",
                fr: "Couleur du bouton",
                pt: "Cor do botão",
              },
              admin: {
                isClearable: true,
                isSortable: true,
              },
            },
            {
              name: "content",
              type: "text",
              required: true,
              localized: true,
              label: {
                en: "Button Text",
                fr: "Texte du bouton",
                pt: "Texto do botão",
              },
            },
            {
              name: "icon",
              type: "upload",
              relationTo: "media",
              required: true,
              label: {
                en: "Button Icon",
                fr: "Icône du bouton",
                pt: "Ícone do botão",
              },
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
