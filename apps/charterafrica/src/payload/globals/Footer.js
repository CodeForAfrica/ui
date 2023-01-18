import linkGroup from "../fields/linkGroup";
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
      label: {
        en: "Copyright",
        pt: "Direito autoral",
        fr: "Droits d'auteur",
      },
      type: "text",
      localized: true,
      required: true,
    },
    linkGroup(),
    {
      name: "newsletterSubscriptionEmbedCode",
      type: "textarea",
      label: {
        en: "Newsletter Subscription Embed Code",
        fr: "Abonnement à la newsletter Code d'intégration",
        pt: "Código Incorporado de Subscrição de Newsletter",
      },
      localized: true,
      required: true,
      // ...richTextEditor,
    },
    {
      name: "footerLogo",
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
  ],
};

export default Footer;
