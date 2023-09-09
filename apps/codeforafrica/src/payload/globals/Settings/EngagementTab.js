import { array } from "payload/dist/fields/validations";

import url from "../../fields/url";

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
    name: "links",
    type: "array",
    label: "Links",
    labels: {
      singular: "Link",
      plural: "Links",
    },
    minRows: 1,
    admin: {
      className: "array-field-nested",
      components: {
        RowLabel: ({ data, index }) => {
          let label = "";
          if (data.platform) {
            label = data.platform;
          }
          if (data.url) {
            label = label ? `${label} (${data.url})` : data.url;
          }
          if (!label) {
            label = `Link ${String(index).padStart(2, "0")}`;
          }
          return label;
        },
      },
      initCollapsed: true,
    },
    fields: [
      {
        name: "platform",
        type: "select",
        label: "Platform",
        options: socialMediaOptions,
        required: true,
        validate: (val, options) => {
          const { data } = options || {};
          if (data?.links?.filter((l) => l.platform === val)?.length > 1) {
            return "Please select a unique platform";
          }
          return array(val, options);
        },
      },
      url({
        overrides: {
          required: true,
        },
      }),
    ],
  };
}

const EngagementTab = {
  label: "Engagement",
  fields: [
    {
      name: "connect",
      type: "group",
      label: "Social Accounts",
      fields: [
        {
          type: "collapsible",
          label: "Title & Links",
          fields: [
            {
              name: "title",
              type: "text",
              label: "Title",
              admin: {
                description:
                  "Text that appears on contact links e.g Stay in Touch",
              },
              required: true,
            },
            socialLinks(),
          ],
        },
      ],
    },
    {
      name: "newsletter",
      type: "group",
      label: "Email Newsletter",
      fields: [
        {
          type: "collapsible",
          label: "Title & Embed Code",
          fields: [
            {
              name: "title",
              type: "text",
              label: "Title",
              required: true,
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
  ],
};

export default EngagementTab;
