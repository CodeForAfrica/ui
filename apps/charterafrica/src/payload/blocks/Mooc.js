import { slateEditor } from "@payloadcms/richtext-slate";

import linkGroup from "../fields/linkGroup";
import richText from "../fields/richText";

const Mooc = {
  slug: "mooc",
  fields: [
    richText({
      name: "title",
      label: {
        en: "Title",
        fr: "Titre",
        pt: "Título",
      },
      required: true,
      localized: true,
      editor: slateEditor({
        admin: {
          elements: [],
          leaves: ["bold", "italic", "underline", "code"],
        },
      }),
    }),
    linkGroup(),
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
