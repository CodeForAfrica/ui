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
  slug: "settings",
  access: {
    read: () => true,
  },
  label: "Settings",
  fields: [
    {
      label: "General",
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
          name: "title",
          type: "text",
          required: true,
        },
        richText({
          name: "description",
          label: "Description",
          required: true,
        }),
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
      ],
    },
    {
      label: "Navigation",
      type: "collapsible",
      fields: [
        {
          type: "group",
          name: "navigation",
          fields: [
            linkArray({
              overrides: {
                label: "Primary Menus",
                name: "primary",
                fields: [linkField],
              },
            }),
            linkArray({
              overrides: {
                label: "Primary Menus",
                name: "secondary",
                fields: [linkField],
              },
            }),
          ],
        },
      ],
    },
  ],
};

export default Globals;
