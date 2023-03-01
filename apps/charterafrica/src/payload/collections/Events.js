import { content } from "../fields/post";
import richText from "../fields/richText";
import slug from "../fields/slug";

const Events = {
  slug: "events",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "topic", "date"],
  },
  access: {
    read: () => true,
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: "name",
      label: {
        en: "Name",
        fr: "Nom",
        pt: "Nome",
      },
      type: "text",
      localized: true,
      required: true,
    },
    slug({ fieldToUse: "name" }),
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
    },
    richText({
      name: "description",
      label: {
        en: "Description",
        fr: "La description",
        pt: "Descrição",
      },
      localized: true,
      required: true,
      admin: {
        elements: ["leaves"],
      },
    }),
    content({ required: false }),
    {
      name: "date",
      type: "date",
      required: true,
      label: {
        en: "Date and Time",
        pt: "Data e hora",
        fr: "Date et l'heure",
      },
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
        position: "sidebar",
      },
    },
  ],
};

export default Events;
