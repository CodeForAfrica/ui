import { validateHexColor, MuiButtonColors } from "../utils/colors";

const { default: link } = require("../fields/link");

const Mooc = {
  slug: "mooc",
  fields: [
    {
      name: "title",
      type: "group",
      label: {
        en: "Title",
        fr: "Titre",
        pt: "Título",
      },
      required: true,
      localized: true,
      fields: [
        {
          name: "color",
          type: "text",
          label: {
            en: "Color",
            fr: "Couleur",
            pt: "Cor",
          },
          validate: validateHexColor,
          required: true,
        },
        {
          name: "content",
          type: "richText",
          required: true,
          localized: true,
          admin: {
            elements: ["h1"],
            leaves: ["bold", "italic", "underline", "code"],
          },
        },
      ],
    },
    {
      name: "link",
      type: "group",
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
        link({}),
      ],
    },
    {
      name: "image",
      label: {
        en: "Image",
        fr: "Image",
        pt: "Imagem",
      },
      type: "upload",
      relationTo: "media",
      required: true,
      filterOptions: {
        mimeType: { contains: "image" },
      },
    },
  ],
};

export default Mooc;
