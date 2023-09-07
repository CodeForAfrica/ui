import { array } from "payload/dist/fields/validations";

import link from "../fields/links/link";
import linkArray from "../fields/links/linkArray";
import richText from "../fields/richText";

const socialMediaOptions = [
  "Facebook",
  "Twitter",
  "Instagram",
  "Linkedin",
  "Github",
  "Slack",
];

function socialLinks() {
  return {
    name: "socialLinks",
    label: "Social Media Links",
    type: "array",
    minRows: 1,
    admin: {
      components: {
        RowLabel: ({ data }) => {
          return data.platform;
        },
      },
    },
    fields: [
      {
        name: "platform",
        label: "Platform",
        type: "select",
        options: socialMediaOptions,
        required: true,
        validate: (val, options) => {
          const { data } = options || {};
          if (
            data?.socialLinks?.filter((l) => l.platform === val)?.length > 1
          ) {
            return "Please select a unique platform";
          }
          return array(val, options);
        },
      },
      {
        name: "url",
        label: "URL",
        type: "text",
        required: true,
      },
    ],
  };
}

const linkField = link({
  disableOpenInNewTab: true,
});

const Globals = {
  slug: "header-and-footer",
  access: {
    read: () => true,
  },
  label: "Globals",
  fields: [
    // Common
    {
      label: "Header and Footer",
      type: "collapsible",
      fields: [
        {
          name: "logo",
          type: "group",
          fields: [
            {
              name: "coloured",
              type: "upload",
              relationTo: "media",
              required: true,
              filterOptions: {
                mimeType: { contains: "image" },
              },
              label: "Coloured Logo",
            },
            {
              name: "blackAndWhite",
              type: "upload",
              relationTo: "media",
              required: true,
              filterOptions: {
                mimeType: { contains: "image" },
              },
              label: "Black and White Logo",
            },
          ],
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
            socialLinks(),
          ],
        },
        linkArray({
          overrides: {
            label: "Menus",
            name: "menus",
            fields: [linkField],
          },
        }),
      ],
    },
    // Footer
    {
      label: "Footer",
      type: "collapsible",
      fields: [
        richText({
          name: "description",
          label: "Description",
          required: true,
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
              admin: {
                language: "html",
              },
            },
          ],
        },
        {
          name: "copyright",
          label: "Copyright",
          type: "text",
        },
      ],
    },
  ],
};

export default Globals;
