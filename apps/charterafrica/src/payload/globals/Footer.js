import richTextEditor from "../fields/richTextEditor";

const Footer = {
  slug: "footer",
  label: {
    en: "Footer",
    fr: "Bas de page",
    pt: "Rodapé",
  },
  fields: [
    {
      name: "siteDescription",
      defaultValue: [
        {
          children: [
            {
              text: "This website was created and maintained with the financial support of the European Union. Its contents are the sole responsibility of the European Partnership for Democracy, Africtivistes, Code for Africa, ECPDM, and Goree Institute and do not necessarily reflect the views of the European Union.",
            },
          ],
        },
      ],
      label: {
        en: "Site Description",
        fr: "Description du site",
        pt: "Descrição do Site",
      },
      type: "richText",
      localized: true,
      required: true,
      ...richTextEditor,
    },
    {
      name: "projectDescription",
      label: {
        en: "Project Description",
        pt: "Descrição do Projeto",
        fr: "Description du projet",
      },
      type: "richText",
      localized: true,
      required: true,
      ...richTextEditor,
    },
    {
      type: "group",
      name: "contact",
      label: {
        en: "Contact",
        pt: "Contact",
        fr: "Contact",
      },
      fields: [
        {
          name: "email",
          type: "email",
          label: {
            en: "Email",
            pt: "Email",
            fr: "Email",
          },
        },
      ],
      localized: true,
      required: true,
    },
    {
      name: "copyright",
      defaultValue: "© 2022 European Partnership for Democracy (CC BY-NC 2.0)",
      label: {
        en: "Copyright",
        pt: "Direito autoral",
        fr: "Droits d'auteur",
      },
      type: "text",
      localized: true,
      required: true,
    },
    {
      name: "links",
      label: {
        en: "Links",
      },
      type: "array",
      fields: [
        {
          name: "content",
          label: {
            en: "Content",
            pt: "Contente",
            fr: "Contenu",
          },
          type: "text",
          localized: true,
          required: true,
        },
        {
          name: "link",
          label: {
            en: "Link",
            pt: "Ligação",
            fr: "Lien",
          },
          type: "text",
          localized: true,
          required: true,
        },
      ],
      localized: true,
      required: true,
    },
    {
      name: "logo",
      required: true,
      localized: true,
      type: "upload",
      relationTo: "media",
      filterOptions: {
        mimeType: { contains: "image" },
        mimeTypes: ["images/*"],
      },
      label: {
        en: "Footer Logo",
        pt: "Imagem",
        fr: "Logo de pied de page",
      },
    },
  ],
};

export default Footer;
