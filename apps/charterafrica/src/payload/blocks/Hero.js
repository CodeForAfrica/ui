import link from "../fields/link";
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
      label: {
        en: "Slides",
        fr: "Diapositives",
        pt: "diapositivos",
      },
      type: "array",
      minRows: 1,
      fields: [
        {
          name: "title",
          label: {
            en: "Title",
            fr: "Titre",
            pt: "Título",
          },
          type: "group",
          fields: [
            {
              name: "color",
              type: "text",
              validate: validateHexColor,
              required: true,
              label: {
                en: "Color",
                fr: "Couleur",
                pt: "Cor",
              },
            },
            {
              name: "content",
              type: "richText",
              label: {
                en: "Title",
                fr: "Titre",
                pt: "Título",
              },
              required: true,
              localized: true,
              admin: {
                elements: ["h1"],
                leaves: ["bold", "italic", "underline", "code"],
              },
            },
          ],
          required: true,
        },
        {
          name: "subheading",
          label: {
            en: "Subheading",
            fr: "Sous-titre",
            pt: "Subtítulo",
          },
          type: "group",
          required: true,
          fields: [
            {
              name: "color",
              type: "text",
              validate: validateHexColor,
              required: true,
              label: {
                en: "Color",
                fr: "Couleur",
                pt: "Cor",
              },
            },
            {
              name: "content",
              type: "text",
              required: true,
              localized: true,
              label: {
                en: "Content",
                fr: "Contenu",
                pt: "Conteúdo",
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
              name: "image",
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
            link(),
          ],
        },
      ],
    },
  ],
};

export default Hero;
