const Footer = {
  slug: "Footer",
  label: {
    en: "Footer",
    fr: "Bas de page",
    pt: "Rodapé",
  },
  fields: [
    {
      name: "siteDescription",
      defaultValue:
        "This website was created and maintained with the financial support of the European Union. Its contents are the sole responsibility of the European Partnership for Democracy, Africtivistes, Code for Africa, ECPDM, and Goree Institute and do not necessarily reflect the views of the European Union.",
      label: {
        en: "Site Description",
        pt: "Descrição do Site",
      },
      type: "textarea",
      localized: true,
      required: true,
    },
    {
      name: "projectDescription",
      defaultValue: "Website designed and built by Code for Africa",
      label: {
        en: "Project Description",
        pt: "Descrição do Projeto",
      },
      type: "text",
      localized: true,
      required: true,
    },
    {
      name: "contactEmail",
      defaultValue: "info@charter.africa",
      label: {
        en: "Contact Email",
        pt: "Email de contato",
      },
      type: "text",
      localized: true,
      required: true,
    },
    {
      name: "copyright",
      defaultValue: "© 2022 European Partnership for Democracy (CC BY-NC 2.0)",
      label: {
        en: "Copyright",
        pt: "Direito autoral",
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
      label: {
        en: "Footer Logo",
        pt: "Imagem",
      },
    },
  ],
};

export default Footer;
