import path from "path";

import { buildConfig } from "payload/config";
import Authors from "./src/payload/collections/Authors";
import GuidingPrinciples from "./src/payload/collections/GuidingPrinciples";
import Impact from "./src/payload/collections/Impact";
import Media from "./src/payload/collections/Media";
import Pages from "./src/payload/collections/Pages";
import Partners from "./src/payload/collections/Partners";
import Settings from "./src/payload/globals/Settings";
import Tags from "./src/payload/collections/Tags";
import { CollectionConfig, GlobalConfig } from "payload/types";
import dotenv from "dotenv";
import seo from "@payloadcms/plugin-seo";
import nestedDocs from "@payloadcms/plugin-nested-docs";
import { cloudStorage } from "@payloadcms/plugin-cloud-storage";
import { s3Adapter } from "@payloadcms/plugin-cloud-storage/s3";

dotenv.config();
dotenv.config({ path: "./.env.local" });

const appURL = process?.env?.PAYLOAD_PUBLIC_APP_URL;

const adapter = s3Adapter({
  config: {
    region: process?.env?.S3_REGION,
    credentials: {
      accessKeyId: process?.env?.S3_ACCESS_KEY_ID,
      secretAccessKey: process?.env?.S3_SECRET_ACCESS_KEY,
    },
  },
  bucket: process?.env?.S3_BUCKET,
} as any);

export default buildConfig({
  serverURL: appURL,
  collections: [
    Authors,
    GuidingPrinciples,
    Impact,
    Pages,
    Media,
    Partners,
    Tags
  ] as CollectionConfig[],
  globals: [Settings] as GlobalConfig[],
  admin: {
    css: path.resolve(__dirname, "./src/payload/admin/scss/custom.scss"),
    webpack: (config) => ({
      ...config,
      resolve: {
        ...config.resolve,
        fallback: {
          ...config?.resolve?.fallback,
          fs: false,
          os: false,
          "process/browser": false,
        },
      },
    }),
  },
  plugins: [
    cloudStorage({
      collections: {
        media: {
          adapter,
          prefix: "media",
        },
      },
    }),
    seo({
      collections: ["pages"],
      globals: [],
      uploadsCollection: "media",
      generateTitle: ({ doc }: any) => doc?.title?.value as string,
      generateURL: ({ doc }: any) =>
        doc?.slug?.value ? `${appURL}/${doc.slug.value}` : undefined,
    } as any),
    nestedDocs({
      collections: ["pages"],
      generateLabel: (_, doc) => doc.title as string,
      generateURL: (docs) =>
        docs.reduce((url, doc) => `${url}/${doc.slug}`, ""),
    }),
  ] as any[],
});
