import { Plugin } from "payload";
import { sentryPlugin } from "@payloadcms/plugin-sentry";
import { s3Storage } from "@payloadcms/storage-s3";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { nestedDocsPlugin } from "@payloadcms/plugin-nested-docs";

import * as Sentry from "@sentry/nextjs";
import { Page } from "@payload-types";
import { GenerateTitle } from "@payloadcms/plugin-seo/types";

const generateTitle: GenerateTitle<Page> = ({ doc }) => {
  return doc.title ?? "";
};

const generateURL: GenerateTitle<Page> = ({ doc }) => {
  const url = process.env.NEXT_PUBLIC_SERVER_URL ?? "";
  return doc.slug ? `${url}/${doc.slug}` : "";
};

const plugins: Plugin[] = [
  s3Storage({
    collections: {
      media: true,
    },
    bucket: process.env.S3_BUCKET ?? "",
    config: {
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID ?? "",
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY ?? "",
      },
      region: process.env.S3_REGION ?? "",
    },
  }),
  sentryPlugin({
    Sentry,
  }),
  nestedDocsPlugin({
    collections: ["pages"],
    generateLabel: (_, doc) => doc.title as string,
    generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ""),
  }),
  seoPlugin({
    collections: ["pages"],
    generateTitle,
    generateURL,
  }),
];

export default plugins;
