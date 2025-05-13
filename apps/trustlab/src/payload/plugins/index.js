import { nestedDocsPlugin } from "@payloadcms/plugin-nested-docs";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { s3Storage } from "@payloadcms/storage-s3";

const plugins = [
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
  nestedDocsPlugin({
    collections: ["pages"],
    generateLabel: (_, doc) => doc.title,
    generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ""),
  }),
  seoPlugin({
    collections: ["pages"],
    generateTitle: ({ doc }) => {
      return doc.title ?? "";
    },
    generateURL: ({ doc }) => {
      const url = process.env.NEXT_PUBLIC_SERVER_URL ?? "";
      return doc.slug ? `${url}/${doc.slug}` : "";
    },
  }),
];

export default plugins;
