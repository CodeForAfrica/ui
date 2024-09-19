import path from "path";

import { buildConfig } from "payload/config";
import { slateEditor } from "@payloadcms/richtext-slate";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { CollectionConfig, GlobalConfig } from "payload/types";
import { cloudStorage } from "@payloadcms/plugin-cloud-storage";
import { sentry } from "@payloadcms/plugin-sentry";
import seo from "@payloadcms/plugin-seo";
import nestedDocs from "@payloadcms/plugin-nested-docs";
import { s3Adapter } from "@payloadcms/plugin-cloud-storage/s3";
import { loadEnvConfig } from "@next/env";

import Authors from "./src/payload/collections/CivicSignalBlog/Authors";
import Media from "./src/payload/collections/CivicSignalBlog/Media";
import Pages from "./src/payload/collections/Pages";
import Posts from "./src/payload/collections/CivicSignalBlog/Posts";
import Publication from "./src/payload/globals/Publication";
import {
  Site,
  Explorer,
  Sources,
  TopicMapper,
} from "./src/payload/globals/Site";
import Tags from "./src/payload/collections/CivicSignalBlog/Tags";
import Users from "./src/payload/collections/Users";
import MediaData from "./src/payload/collections/CivicSignalTools/MediaData";
import { defaultLocale, locales } from "./src/payload/utils/locales";

const dev = process.env.NODE_ENV !== "production";
const projectDir = process.cwd();
loadEnvConfig(projectDir, dev);

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
  editor: slateEditor({}),
  db: mongooseAdapter({
    url: process.env.MONGO_URL,
    migrationDir: process.env.MIGRATIONS_DIR,
  }),
  collections: [
    Authors,
    Media,
    Pages,
    Posts,
    Tags,
    MediaData,
    Users,
  ] as CollectionConfig[],
  globals: [
    Publication,
    Site,
    Explorer,
    Sources,
    TopicMapper,
  ] as GlobalConfig[],
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
    livePreview: {
      breakpoints: [
        {
          label: "Mobile",
          name: "mobile",
          width: 375,
          height: 667,
        },
      ],
    },
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
      collections: ["pages", "posts"],
      globals: ["settings-site"],
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
