import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from "@payloadcms/plugin-seo/fields";

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
  ],
};

export default SeoTab;
