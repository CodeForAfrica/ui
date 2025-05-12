import { type Tab } from "payload";
import socialLinks from "@/trustlab/payload/fields/socialLinks";

const EngagementTab: Tab = {
  label: "Engagement",
  fields: [
    {
      name: "connect",
      type: "group",
      label: "Social Accounts",
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
      localized: true,
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
