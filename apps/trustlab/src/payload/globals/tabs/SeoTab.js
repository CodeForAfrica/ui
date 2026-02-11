import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
  /* eslint-disable-next-line import/no-unresolved */
} from "@payloadcms/plugin-seo/fields";

import parseRobotsToMetadata from "@/trustlab/utils/parseRobotsTxt";

const validateRobotsTxt = (value) => {
  if (!value?.trim()) {
    return true;
  }
  const result = parseRobotsToMetadata(value, { collectDiagnostics: true });
  if (!result.errors?.length) {
    return true;
  }
  const message = result.errors
    .map(({ line, directive, reason }) =>
      [`line ${line}`, directive ? `directive "${directive}"` : null, reason]
        .filter(Boolean)
        .join(" "),
    )
    .join("; ");
  return `Invalid robots.txt: ${message}`;
};

const SeoTab = {
  label: "SEO",
  fields: [
    {
      name: "meta",
      type: "group",
      fields: [
        MetaTitleField({
          // if the `generateTitle` function is configured
          hasGenerateFn: true,
        }),
        MetaDescriptionField({
          // if the `generateDescription` function is configured
          hasGenerateFn: true,
        }),
        // Used as fields
        MetaImageField({
          // the upload collection slug
          relationTo: "media",

          // if the `generateImage` function is configured
          hasGenerateFn: true,
        }),
        PreviewField({
          // if the `generateUrl` function is configured
          hasGenerateFn: true,

          // field paths to match the target field for data
          titlePath: "meta.title",
          descriptionPath: "meta.description",
        }),
        OverviewField({
          // field paths to match the target field for data
          titlePath: "meta.title",
          descriptionPath: "meta.description",
          imagePath: "meta.image",
        }),
      ],
    },
    {
      name: "robotsTxt",
      label: "robots.txt",
      type: "code",
      defaultValue: "User-agent: *\nDisallow: /",
      admin: {
        language: "plaintext",
        rows: 14,
        description: "Enter the exact robots.txt text to serve.",
      },
      validate: validateRobotsTxt,
    },
  ],
};

export default SeoTab;
