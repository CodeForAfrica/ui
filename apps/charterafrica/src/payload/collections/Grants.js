import { slateEditor } from "@payloadcms/richtext-slate";

import content from "../fields/content";
import linkGroup from "../fields/linkGroup";
import publishedOn from "../fields/publishedOn";
import richText from "../fields/richText";
import slug from "../fields/slug";

const Grant = {
  slug: "grants",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "author", "publishedOn"],
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
      name: "status",
      label: {
        en: "Status",
        fr: "Statut",
        pt: "Status",
      },
      type: "select",
      options: [
        {
          label: {
            en: "Open",
            fr: "Ouvrir",
            pt: "Abrir",
          },
          value: "open",
        },
        {
          label: {
            en: "Closed",
            fr: "Fermé",
            pt: "Fechado",
          },
          value: "closed",
        },
        {
          label: {
            en: "Upcoming",
            pt: "Por vir",
            fr: "A venir",
          },
          value: "upcoming",
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
      editor: slateEditor({
        admin: {
          elements: ["leaves"],
        },
      }),
    }),
    content(),
    {
      name: "deadline",
      type: "date",
      validate: async (val, { siblingData }) => {
        if (siblingData.status === "closed") {
          return true;
        }
        if (!val) {
          return "This field is required";
        }
        return true;
      },
      admin: {
        position: "sidebar",
      },
    },
    linkGroup({
      overrides: {
        name: "apply",
        label: {
          en: "Apply Here",
          fr: "Appliquer ici",
          pt: "Aplique aqui",
        },
      },
    }),
    publishedOn(),
  ],
};

export default Grant;
