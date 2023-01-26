import { text, array } from "payload/dist/fields/validations";

import linkArray from "../fields/linkArray";
import richText from "../fields/richText";

const Footer = {
  slug: "footer",
  label: {
    en: "Footer",
    fr: "Bas de page",
    pt: "Rodapé",
  },
  fields: [
    {
      name: "contact",
      label: {
        en: "Contact",
        pt: "Contact",
        fr: "Contact",
      },
      type: "group",
      fields: [
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
      ],
    },
    richText({
      name: "siteDescription",
      label: {
        en: "Site Description",
        fr: "Description du site",
        pt: "Descrição do Site",
      },
      localized: true,
      required: true,
      admin: {
        elements: ["ol", "ul", "link"],
        leaves: ["bold", "italic", "underline", "code"],
      },
    }),
    {
      type: "group",
      name: "connect",
      label: {
        en: "Social Links",
        pt: "Links de mídia social",
        fr: "Liens de médias sociaux",
      },
      fields: [
        {
          name: "title",
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
          name: "links",
          label: {
            en: "Links",
            ft: "Liens",
            pt: "Links",
          },
          type: "array",
          fields: [
            {
              name: "media",
              label: {
                en: "Media",
                pt: "Media",
              },
              type: "select",
              options: [
                {
                  value: "twitter",
                  label: "Twitter",
                },
                {
                  value: "slack",
                  label: "Slack",
                },
                {
                  value: "linkedin",
                  label: "LinkedIn",
                },
                {
                  value: "facebook",
                  label: "Facebook",
                },
                {
                  value: "instagram",
                  label: "Instagram",
                },
                {
                  value: "github",
                  label: "Github",
                },
              ],
              unique: true,
              required: true,
              admin: {
                isClearable: false,
                isSortable: true,
              },
              validate: (val, options) => {
                const { data, t } = options || {};
                if (
                  data?.connect?.links?.filter((l) => l.media === val)?.length >
                  1
                ) {
                  return t("charterafrica.site:uniqueMedia");
                }
                return array(val, options);
              },
            },
            {
              name: "url",
              label: {
                en: "URL",
                fr: "URL",
                pt: "URl",
              },
              type: "text",
              required: true,
              admin: {
                description: () => "Full URL",
              },
            },
          ],
          admin: {
            initCollapsed: true,
            components: {
              RowLabel: ({ data }) => {
                return data?.media || data?.url || data?.id;
              },
            },
          },
          required: true,
        },
      ],
      localized: true,
    },
    richText({
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
        elements: ["ol", "ul", "link"],
        leaves: ["bold", "italic", "underline", "code"],
      },
    }),
    linkArray(),
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
            en: "Title",
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
  ],
};

export default Footer;
