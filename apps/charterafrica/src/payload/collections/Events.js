import { slateEditor } from "@payloadcms/richtext-slate";

import content from "../fields/content";
import linkGroup from "../fields/linkGroup";
import publishedOn from "../fields/publishedOn";
import richText from "../fields/richText";
import slug from "../fields/slug";

const Events = {
  slug: "events",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "topic", "date"],
  },
  access: {
    read: () => true,
  },
  versions: {
    drafts: true,
  },
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
    slug(),
    {
      name: "coverImage",
      label: {
        en: "Cover Image",
        pt: "Imagem de capa",
        fr: "Image de couverture",
      },
      type: "upload",
      relationTo: "media",
      required: true,
      filterOptions: {
        mimeType: { contains: "image" },
      },
    },
    {
      type: "row",
      fields: [
        {
          name: "date",
          label: {
            en: "Date and Time",
            pt: "Data e hora",
            fr: "Date et l'heure",
          },
          type: "date",
          required: true,
          admin: {
            date: {
              pickerAppearance: "dayAndTime",
            },
            width: "50%",
          },
        },
        {
          name: "topic",
          label: {
            en: "Topic",
            fr: "Sujet",
            pt: "Tema",
          },
          type: "text",
          localized: true,
          required: true,
          admin: {
            width: "50%",
          },
        },
      ],
    },
    richText({
      name: "excerpt",
      label: {
        en: "Excerpt",
        fr: "Extrait",
        pt: "Excerto",
      },
      localized: true,
      required: true,
      editor: slateEditor({
        admin: {
          elements: ["leaves"],
        },
      }),
    }),
    content({ required: false }),
    linkGroup({
      overrides: {
        name: "register",
        label: {
          en: "Register Here",
          fr: "Inscrivez-vous ici",
          pt: "Registre-se aqui",
        },
      },
    }),
    publishedOn(),
  ],
};

export default Events;
