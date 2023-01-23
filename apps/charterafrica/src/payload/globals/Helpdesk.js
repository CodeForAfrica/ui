import linkGroup from "../fields/linkGroup";

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
        {
          name: "description",
          label: {
            en: "Description",
            pt: "Descrição",
          },
          type: "richText",
          localized: true,
          required: true,
          admin: {
            elements: ["ol", "ul", "link"],
          },
        },
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
