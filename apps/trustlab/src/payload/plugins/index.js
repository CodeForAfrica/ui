import { nestedDocsPlugin } from "@payloadcms/plugin-nested-docs";
import { sentryPlugin } from "@payloadcms/plugin-sentry";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { s3Storage } from "@payloadcms/storage-s3";
import * as Sentry from "@sentry/nextjs";

const accessKeyId = process.env.S3_ACCESS_KEY_ID ?? "";
const bucket = process.env.S3_BUCKET ?? "";
const region = process.env.S3_REGION ?? "";
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY ?? "";
const s3Enabled = !!accessKeyId && !!region && !!secretAccessKey;

const plugins = [
  nestedDocsPlugin({
    collections: ["pages"],
    generateLabel: (_, doc) => doc.title,
    generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ""),
  }),
  s3Storage({
    collections: {
      media: true,
    },
    bucket,
    config: {
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
      region,
    },
    enabled: s3Enabled,
  }),
  sentryPlugin({
    options: {
      context: ({ defaultContext, req }) => {
        return {
          ...defaultContext,
          tags: {
            locale: req.locale,
          },
        };
      },
    },
    Sentry,
  }),
  seoPlugin({
    collections: ["pages"],
    generateTitle: ({ doc }) => {
      return doc.title ?? "";
    },
    generateURL: ({ doc }) => {
      const url = process.env.NEXT_PUBLIC_APP_URL ?? "";
      return doc.slug ? `${url}/${doc.slug}` : "";
    },
  }),
];

export default plugins;
