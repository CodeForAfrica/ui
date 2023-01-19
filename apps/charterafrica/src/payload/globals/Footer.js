import linkGroup from "../fields/linkGroup";

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
      label: {
        en: "Site Description",
        fr: "Description du site",
        pt: "Descrição do Site",
      },
      type: "richText",
      localized: true,
      required: true,
      admin: {
        elements: ["h2", "h3", "h4", "h5", "h6", "ol", "ul", "link"],
      },
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
      admin: {
        elements: ["h2", "h3", "h4", "h5", "h6", "ol", "ul", "link"],
      },
    },
    linkGroup(),
    {
      name: "newsletter",
      type: "group",
      label: {
        en: "Newsletter",
        fr: "Newsletter",
        pt: "Boletim de Notícias        ",
      },
      fields: [
        {
          name: "title",
          required: true,
          localized: true,
          type: "text",
          label: {
            en: "Title",
            fr: "Titre",
            pt: "título",
          },
        },
        {
          name: "embedCode",
          type: "code",
          label: {
            en: "Embed Code",
            fr: "Code d'intégre",
            pt: "Código Incorporado",
          },
          localized: true,
          required: true,
        },
      ],
    },
    {
      name: "logo",
      required: true,
      localized: true,
      type: "group",
      label: {
        en: "Footer Logo",
        pt: "Imagem",
        fr: "Logo de pied de page",
      },
      fields: [
        {
          name: "title",
          required: true,
          localized: true,
          type: "text",
          label: {
            en: "Footer Title",
            fr: "Titre",
            pt: "título",
          },
        },
        {
          name: "src",
          type: "upload",
          relationTo: "media",
          required: true,
          localized: true,
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
    },
    {
      type: "group",
      name: "contact",
      label: {
        en: "Contact",
        pt: "Contact",
        fr: "Contact",
      },
      admin: {
        width: "100%",
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
          admin: {
            width: "50%",
          },
        },
        {
          name: "twitter",
          type: "text",
          label: {
            en: "Twitter",
            pt: "Twitter",
            fr: "Twitter",
          },
          admin: {
            width: "50%",
          },
        },
        {
          name: "slack",
          type: "text",
          label: {
            en: "Slack",
            pt: "Slack",
            fr: "Slack",
          },
          admin: {
            width: "50%",
          },
        },
        {
          name: "linkedin",
          type: "text",
          label: {
            en: "LinkedIn",
            pt: "LinkedIn",
            fr: "LinkedIn",
          },
          admin: {
            width: "50%",
          },
        },
        {
          name: "facebook",
          type: "text",
          label: {
            en: "Facebook",
            pt: "Facebook",
            fr: "Facebook",
          },
          admin: {
            width: "50%",
          },
        },
        {
          name: "instagram",
          type: "text",
          label: {
            en: "Instagram",
            pt: "Instagram",
            fr: "Instagram",
          },
          admin: {
            width: "50%",
          },
        },
        {
          name: "github",
          type: "text",
          label: {
            en: "Github",
            pt: "Github",
            fr: "Github",
          },
          admin: {
            width: "50%",
          },
        },
      ],
      localized: true,
      required: true,
    },
    {
      name: "copyright",
      label: {
        en: "Copyright",
        pt: "Direito autoral",
        fr: "Droits d'auteur",
      },
      type: "text",
      localized: true,
      required: true,
    },
  ],
};

export default Footer;
