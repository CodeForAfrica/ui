import { text } from "payload/dist/fields/validations";

import linkArray from "../fields/linkArray";

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
    linkArray(),
    {
      name: "newsletter",
      type: "group",
      label: {
        en: "Newsletter",
        fr: "Newsletter",
        pt: "Boletim de Notícias",
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
      name: "funder",
      required: true,
      type: "group",
      label: {
        en: "Funder",
        pt: "Financiador",
        fr: "Bailleur de fonds",
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
          name: "logo",
          type: "upload",
          relationTo: "media",
          required: true,
          filterOptions: {
            mimeType: { contains: "image" },
          },
          label: {
            en: "Logo",
            pt: "Imagem",
            fr: "Logo",
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
          name: "stayInTouch",
          type: "text",
          label: {
            en: "Title",
            fr: "Titre",
            pt: "Título",
          },
          admin: {
            description: () =>
              "Text that appears on contact links e.g Stay in Touch",
          },
          localized: true,
          required: true,
        },
        {
          name: "email",
          type: "email",
          label: {
            en: "Email",
            pt: "Email",
            fr: "Email",
          },
          validate: (val, args) => {
            const regex =
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if (!regex.test(val)) {
              return "Enter a valid address";
            }
            return text(val, args);
          },
          admin: {
            description: () => "Enter an email address",
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
          validate: (val, args) => {
            const regex =
              /http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/;

            if (!regex.test(val)) {
              return "Enter a valid address";
            }
            return text(val, args);
          },
          admin: {
            description: () =>
              "Twitter profile address e.g https://twitter.com/profile",
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
            description: () =>
              "Slack workspace address e.g https://workspace.slack.com",
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
          validate: (val, args) => {
            const regex =
              /^(https:\/\/www\.linkedin\.com\/(in|company)\/[a-zA-Z0-9-]+)\/*$/;
            if (!regex.test(val)) {
              return "Enter a valid address";
            }
            return text(val, args);
          },
          admin: {
            description: () =>
              "Linked profile address e.g https://www.linkedin.com/in/profile/",
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
          validate: (val, args) => {
            const regex =
              /^(https:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9/.\-_]+)$/;
            if (!regex.test(val)) {
              return "Enter a valid address";
            }
            return text(val, args);
          },
          admin: {
            description: () =>
              "Facebook profile address e.g https://facebook.com/profile",
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
          validate: (val, args) => {
            const regex =
              /http(?:s)?:\/\/(?:www\.)?instagram\.com\/([a-zA-Z0-9_]+)/;
            if (!regex.test(val)) {
              return "Enter a valid address";
            }
            return text(val, args);
          },
          admin: {
            description: () =>
              "Facebook profile address e.g https://www.instagram.com/username/",
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
          validate: (val, args) => {
            const regex =
              /http(?:s)?:\/\/(?:www\.)?github\.com\/([a-zA-Z0-9_]+)/;
            if (!regex.test(val)) {
              return "Enter a valid address";
            }
            return text(val, args);
          },
          admin: {
            description: () =>
              "Github profile address e.g https://github.com/username",
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
