import { buildConfig } from "payload/config";
import { loadEnvConfig } from "@next/env";
import { cloudStorage } from "@payloadcms/plugin-cloud-storage";
import { s3Adapter } from "@payloadcms/plugin-cloud-storage/s3";
import { slateEditor } from "@payloadcms/richtext-slate";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { CollectionConfig, GlobalConfig } from "payload/types";
import nestedDocs from "@payloadcms/plugin-nested-docs";
import seo from "@payloadcms/plugin-seo";
import { sentry } from "@payloadcms/plugin-sentry";
import { defaultLocale, locales } from "./src/payload/utils/locales";

import Media from "./src/payload/collections/Media";
import Pages from "./src/payload/collections/Pages";
import Users from "./src/payload/collections/Users";

import Site from "./src/payload/globals/Site";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

const appURL = process.env.PAYLOAD_PUBLIC_APP_URL;

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
  editor: slateEditor({}),
  routes: {
    admin: "/admin",
  },
  db: mongooseAdapter({
    url: process.env.MONGO_URL,
    migrationDir: process.env.MIGRATIONS_DIR,
  }),
  collections: [Media, Pages, Users] as CollectionConfig[],
  globals: [Site] as GlobalConfig[],
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
    bundler: webpackBundler(),
  },
  cors,
  csrf,
  i18n: {
    fallbackLng: "en", // default
    debug: false, // default
    resources: {
      en: {
        "codeforafrica.validation": {
          uniquePlatforms: "Please select a unique platform",
        },
      },
    },
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
    sentry({
      dsn: process?.env?.NEXT_PUBLIC_SENTRY_DSN,
    }),
    seo({
      collections: ["pages"],
      globals: ["settings"],
      uploadsCollection: "media",
      generateTitle: ({ doc }: any) => doc?.title?.value as string,
      generateURL: ({ doc }: any) =>
        doc?.slug?.value ? `${appURL}/${doc.slug.value}` : undefined,
    }),
    nestedDocs({
      collections: ["pages"],
      generateLabel: (_, doc) => doc.title as string,
      generateURL: (docs) =>
        docs.reduce((url, doc) => `${url}/${doc.slug}`, ""),
    }),
  ],
});
