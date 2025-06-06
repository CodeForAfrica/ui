import { socialLinks } from "@commons-ui/payload";

const EngagementTab = {
  label: "Engagement",
  fields: [
    {
      name: "connect",
      type: "group",
      label: "Social Accounts",
      // If localized is enabled at group level, no need for localized at nested field level
      // https://payloadcms.com/docs/fields/group
      localized: true,
      fields: [
        {
          type: "collapsible",
          label: "Title & Links",
          fields: [
            {
              name: "title",
              type: "text",
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
      localized: true,
      fields: [
        {
          type: "collapsible",
          label: "Title & Embed Code",
          fields: [
            {
              name: "title",
              type: "text",
              required: true,
            },
            {
              name: "embedCode",
              type: "code",
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
      name: "analytics",
      type: "group",
      label: "Site Analytics",
      fields: [
        {
          type: "collapsible",
          label: "Google Analytics",
          fields: [
            {
              name: "analyticsId",
              type: "text",
            },
          ],
          admin: {
            description:
              "Measurement ID: https://support.google.com/analytics/answer/12270356",
          },
        },
      ],
    },
  ],
};

export default EngagementTab;
