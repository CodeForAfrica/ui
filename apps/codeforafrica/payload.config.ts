import { buildConfig } from "payload/config";
import Media from "./src/payload/collections/Media";
import Pages from "./src/payload/collections/Pages";
import { CollectionConfig, GlobalConfig } from "payload/types";
import dotenv from "dotenv";
import seo from "@payloadcms/plugin-seo";
import nestedDocs from "@payloadcms/plugin-nested-docs";
import { cloudStorage } from "@payloadcms/plugin-cloud-storage";
import { s3Adapter } from "@payloadcms/plugin-cloud-storage/s3";

import Footer from "./src/payload/globals/Footer";

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
  collections: [Pages, Media] as CollectionConfig[],
  globals: [Footer] as GlobalConfig[],
  admin: {
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
      collections: [],
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
  ],
});