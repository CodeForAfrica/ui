import { array } from "payload/dist/fields/validations";

import linkArray from "../fields/links/linkArray";

const Footer = {
  slug: "footer",
  access: {
    read: () => true,
  },
  label: "Footer",
  fields: [
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
      required: true,
      filterOptions: {
        mimeType: { contains: "image" },
      },
      label: "Logo",
    },
    {
      name: "description",
      type: "code",
      label: "Description",
      required: true,
    },
    {
      type: "group",
      name: "connect",
      label: "Social Accounts",
      fields: [
        {
          name: "title",
          type: "text",
          label: "Title",
          admin: {
            description: () =>
              "Text that appears on contact links e.g Stay in Touch",
          },

          required: true,
        },
        {
          name: "links",
          label: "Links to social media",
          type: "array",
          fields: [
            {
              name: "media",
              label: "Media",
              type: "select",
              options: [
                {
                  value: "facebook",
                  label: "Facebook",
                },
                {
                  value: "github",
                  label: "Github",
                },
                {
                  value: "instagram",
                  label: "Instagram",
                },
                {
                  value: "linkedin",
                  label: "LinkedIn",
                },
                {
                  value: "slack",
                  label: "Slack",
                },
                {
                  value: "twitter",
                  label: "Twitter",
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
                  return t("codeforafrica.site:uniqueMedia");
                }
                return array(val, options);
              },
            },
            {
              name: "url",
              label: "URL",
              type: "text",
              required: true,
              admin: {
                description: () => "Full URL",
              },
            },
            {
              name: "icon",
              label: "Icon",
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
            components: {
              RowLabel: ({ data }) => {
                return data?.media || data?.url || data?.id;
              },
            },
          },
          required: true,
        },
      ],
    },
    linkArray({
      overrides: {
        name: "menu",
        label: "Menu",
      },
    }),
    linkArray({
      overrides: {
        name: "secondaryMenu",
        label: "Secondary Menu",
      },
    }),
    {
      name: "newsletter",
      type: "group",
      label: "Newsletter",
      fields: [
        {
          name: "title",
          required: true,

          type: "text",
          label: "Title",
        },
        {
          name: "embedCode",
          type: "code",
          label: "Embed Code",
          required: true,
        },
      ],
    },
    {
      name: "copyright",
      label: "Copyright",
      type: "text",
    },
  ],
};

export default Footer;
