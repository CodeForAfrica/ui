import { slateEditor } from "@payloadcms/richtext-slate";

import linkGroup from "../fields/linkGroup";
import richText from "../fields/richText";

const Helpdesk = {
  slug: "helpdesk",
  label: {
    en: "Democracy Helpdesk",
    fr: "Démocratie Helpdesk",
    pt: "Democracia Helpdesk",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      label: {
        en: "Title & description",
        fr: "Titre & description",
        pt: "Titulo & descrição",
      },
      type: "collapsible", // required
      fields: [
        {
          name: "title",
          label: {
            en: "Title",
            fr: "Titre",
            pt: "Título",
          },
          type: "text",
          localized: true,
          required: true,
        },
        richText({
          name: "description",
          label: {
            en: "Description",
            pt: "Descrição",
          },
          type: "richText",
          localized: true,
          required: true,
          editor: slateEditor({
            admin: {
              elements: ["ol", "ul", "link"],
            },
          }),
        }),
        linkGroup(),
      ],
      admin: {
        initCollapsed: true,
      },
    },
    {
      label: {
        en: "Logo",
        ft: "Logo",
        pt: "Logo",
      },
      type: "collapsible", // required
      fields: [
        {
          name: "image",
          label: {
            en: "Image",
            ft: "Image",
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
      admin: {
        initCollapsed: true,
      },
    },
  ],
};

export default Helpdesk;
