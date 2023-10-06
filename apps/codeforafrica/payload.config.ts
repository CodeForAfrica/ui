import path from "path";

import { buildConfig } from "payload/config";
import { CollectionConfig, GlobalConfig } from "payload/types";
import { cloudStorage } from "@payloadcms/plugin-cloud-storage";
import dotenv from "dotenv";
import seo from "@payloadcms/plugin-seo";
import nestedDocs from "@payloadcms/plugin-nested-docs";
import { s3Adapter } from "@payloadcms/plugin-cloud-storage/s3";

import Authors from "./src/payload/collections/Authors";
import Donors from "./src/payload/collections/Donors";
import GuidingPrinciples from "./src/payload/collections/GuidingPrinciples";
import Impact from "./src/payload/collections/Impact";
import Media from "./src/payload/collections/Media";
import Members from "./src/payload/collections/Members";
import Pages from "./src/payload/collections/Pages";
import Partners from "./src/payload/collections/Partners";
import Posts from "./src/payload/collections/Posts";
import Publications from "./src/payload/globals/Publications";
import Projects from "./src/payload/collections/Projects";
import Site from "./src/payload/globals/Site";
import Tags from "./src/payload/collections/Tags";
import Teams from "./src/payload/collections/Teams";
import Users from "./src/payload/collections/Users";
import { defaultLocale, locales } from "./src/payload/utils/locales";

dotenv.config();
dotenv.config({ path: "./.env.local" });

const appURL = process?.env?.PAYLOAD_PUBLIC_APP_URL;

const cors =
  process?.env?.PAYLOAD_CORS?.split(",")
    ?.map((d) => d.trim())
    ?.filter(Boolean) ?? [];

const csrf =
  process?.env?.PAYLOAD_CSRF?.split(",")
    ?.map((d) => d.trim())
    ?.filter(Boolean) ?? [];

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
    Donors,
    GuidingPrinciples,
    Impact,
    Media,
    Members,
    Pages,
    Partners,
    Projects,
    Posts,
    Tags,
    Teams,
    Users,
  ] as CollectionConfig[],
  globals: [Publications, Site] as GlobalConfig[],
  ...(locales?.length
    ? {
        localization: {
          locales,
          defaultLocale,
          fallback: true,
        },
      }
    : undefined),
  admin: {
    css: path.resolve(__dirname, "./src/payload/admin/scss/custom.scss"),
    user: Users.slug,
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
  cors,
  csrf,
  i18n: {
    fallbackLng: "en", // default
    debug: false, // default
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
      collections: ["pages", "posts"],
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
  telemetry: process?.env?.NODE_ENV !== "production",
});
