import { deepmerge } from "@mui/utils";

import { linkGroup } from "@/commons-ui/payload/fields";

const labelByAction = {
  link: "Link",
  embed: "Embed",
};

function linkOrEmbed({ overrides = undefined } = {}) {
  const fieldResult = {
    type: "collapsible",
    label: ({ data }) =>
      data?.action ? labelByAction[data.action] : "Link or Embed",
    fields: [
      {
        name: "action", // required
        type: "radio", // required
        options: [
          // required
          {
            value: "link",
          },
          {
            value: "embed",
          },
        ],
        defaultValue: "link", // The first value in options.
        admin: {
          layout: "horizontal",
        },
      },
      linkGroup({
        overrides: {
          name: "link",
          required: false,
          admin: {
            condition: (_, siblingData) => siblingData?.action === "link",
            hideGutter: true,
          },
        },
      }),
      {
        name: "embed",
        type: "group",
        fields: [
          {
            name: "type", // required
            type: "radio", // required
            options: [
              // required
              {
                value: "basic",
                admin: {
                  description:
                    "Basic iframe embed using a source URL, ideal for providers like Airtable. This option enables a faster, optimized modal experience.",
                },
              },
              {
                value: "advanced",
                admin: {
                  description:
                    "Advanced iframe embed using custom HTML or JavaScript. This option is less optimized than the Basic embed.",
                },
              },
            ],
            defaultValue: "basic",
            admin: {
              layout: "horizontal",
            },
          },
          {
            name: "title",
            type: "text",
            localized: true,
          },
          {
            name: "url",
            type: "text",
            label: "URL",
            admin: {
              condition: (_, siblingData) =>
                siblingData?.embed?.type === "basic",
            },
          },
          {
            name: "code",
            type: "code",
            admin: {
              language: "html",
              condition: (_, siblingData) =>
                siblingData?.embed?.type === "advanced",
              description:
                "Paste provider HTML only when Embed URL is not possible, for example script-driven embeds or div + JS snippets.",
            },
          },
          {
            name: "openLabel",
            type: "text",
            admin: {
              condition: (_, siblingData) =>
                Boolean(siblingData?.embedUrl || siblingData?.embedCode),
              width: "50%",
            },
            defaultValue: "View",
          },
          {
            name: "closeLabel",
            type: "text",
            admin: {
              condition: (_, siblingData) =>
                Boolean(siblingData?.embedUrl || siblingData?.embedCode),
            },
            defaultValue: "Close",
            width: "50%",
          },
        ],
        admin: {
          condition: (_, siblingData) => siblingData?.action === "embed",
          hideGutter: true,
        },
      },
    ],
  };

  return deepmerge(fieldResult, overrides);
}

export default linkOrEmbed;
