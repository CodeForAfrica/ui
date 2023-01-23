import linkGroup from "../fields/linkGroup";
import { MuiButtonColors } from "../utils/colors";

const Mooc = {
  slug: "mooc",
  fields: [
    {
      name: "title",
      type: "richText",
      required: true,
      localized: true,
      admin: {
        elements: ["h1"],
        leaves: ["bold", "italic", "underline", "code"],
      },
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
        linkGroup({}),
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
