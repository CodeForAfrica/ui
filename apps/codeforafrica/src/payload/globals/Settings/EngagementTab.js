import socialLinks from "../../fields/socialLinks";

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
