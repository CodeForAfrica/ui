const formatCondition = (expected) => (_, siblingData) => {
  return (siblingData?.format ?? "text") === expected;
};

const stringListField = ({
  name,
  label,
  required = false,
  placeholder = "value-1, value-2",
  description,
}) => ({
  name,
  label,
  type: "text",
  required,
  admin: {
    placeholder,
    description: `${description} Enter comma-separated values.`,
  },
});

const ruleFieldSet = [
  stringListField({
    name: "userAgent",
    label: "User agent(s)",
    required: true,
  }),
  stringListField({
    name: "allow",
    label: "Allow paths",
    description: "Paths that should remain crawlable for these agents.",
  }),
  stringListField({
    name: "disallow",
    label: "Disallow paths",
    description: "Paths that should be blocked for these agents.",
  }),
  {
    name: "crawlDelay",
    label: "Crawl delay (seconds)",
    type: "number",
    admin: { description: "Optional crawl-delay override for these agents." },
  },
];

const robotsTxtField = () => ({
  name: "robotsTxt",
  label: "robots.txt",
  type: "group",
  fields: [
    {
      name: "format",
      label: "Input type",
      type: "radio",
      defaultValue: "text",
      options: [
        { label: "Plain text file", value: "text" },
        { label: "Structured object (Next.js RobotsFile)", value: "object" },
      ],
      admin: {
        layout: "horizontal",
      },
    },
    {
      name: "textContent",
      label: "robots.txt content",
      type: "code",
      defaultValue: "User-agent: *\nDisallow: /",
      admin: {
        language: "plaintext",
        rows: 14,
        condition: formatCondition("text"),
        description: "Paste the exact robots.txt text to serve.",
      },
    },
    {
      name: "objectContent",
      label: "Structured configuration",
      type: "group",
      admin: {
        condition: formatCondition("object"),
        description:
          "Build a Next.js RobotsFile-compatible object using form inputs.",
      },
      fields: [
        {
          name: "ruleSet",
          label: "Rules array",
          type: "array",
          admin: {
            description: "Add one entry per user-agent group.",
          },
          fields: [
            {
              name: "rule",
              type: "group",
              label: "Rule",
              fields: ruleFieldSet,
            },
          ],
        },
        stringListField({
          name: "sitemap",
          label: "Sitemap URLs",
          description: "Optional sitemap references.",
        }),
        {
          name: "host",
          label: "Preferred host",
          type: "text",
          admin: {
            description:
              "Optional Host directive (e.g. https://trustlab.africa).",
          },
        },
      ],
    },
  ],
});

export default robotsTxtField;
