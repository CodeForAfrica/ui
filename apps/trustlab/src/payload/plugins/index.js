import { nestedDocsPlugin } from "@payloadcms/plugin-nested-docs";
import { sentryPlugin } from "@payloadcms/plugin-sentry";
import { seoPlugin } from "@payloadcms/plugin-seo";
/* eslint-disable-next-line import/no-unresolved */
import { convertLexicalToPlaintext } from "@payloadcms/richtext-lexical/plaintext";
import { s3Storage } from "@payloadcms/storage-s3";
import * as Sentry from "@sentry/nextjs";

import { site } from "@/trustlab/utils";

const accessKeyId = process.env.S3_ACCESS_KEY_ID ?? "";
const bucket = process.env.S3_BUCKET ?? "";
const region = process.env.S3_REGION ?? "";
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY ?? "";
const s3Enabled = !!accessKeyId && !!region && !!secretAccessKey;

const plugins = [
  nestedDocsPlugin({
    collections: ["pages", "posts"],
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
    collections: ["pages", "posts", "helplines", "resources"],
    generateDescription: ({ doc }) => {
      const data = doc?.description || doc?.excerpt;
      if (data) {
        return convertLexicalToPlaintext({ data });
      }
      return "";
    },
    generateTitle: ({ doc }) => doc?.title ?? "",
    generateURL: ({ doc }) => (doc?.slug ? `${site.url}${doc.slug}` : ""),
    uploadsCollection: "media",
  }),
];

export default plugins;
