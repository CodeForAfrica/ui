import path from "path";

import { loadEnvConfig } from "@next/env";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { cloudStorage } from "@payloadcms/plugin-cloud-storage";
import { s3Adapter } from "@payloadcms/plugin-cloud-storage/s3";
import nestedDocs from "@payloadcms/plugin-nested-docs";
import { sentry } from "@payloadcms/plugin-sentry";
import seo from "@payloadcms/plugin-seo";
import { slateEditor } from "@payloadcms/richtext-slate";
import { Request, Response, NextFunction } from "express";
import { buildConfig } from "payload/config";
import { CollectionConfig, GlobalConfig } from "payload/types";

import MediaData from "./src/payload/collections/Main/MediaData";
import CivicSignalPages from "./src/payload/collections/Main/Pages";
import Authors from "./src/payload/collections/Research/Authors";
import Media from "./src/payload/collections/Research/Media";
import Pages from "./src/payload/collections/Research/Pages";
import Posts from "./src/payload/collections/Research/Posts";
import Tags from "./src/payload/collections/Research/Tags";
import Users from "./src/payload/collections/Users";
import Actions from "./src/payload/components/actions";
import Publication from "./src/payload/globals/Publication";
import Main from "./src/payload/globals/Site/main";
import Research from "./src/payload/globals/Site/research";
import Login from "./src/payload/globals/Forms/login";
import PasswordReset from "./src/payload/globals/Forms/resetPassword";
import Registration from "./src/payload/globals/Forms/registration";
import { applicationPages } from "./src/payload/lib/data/common/applications";
import { defaultLocale, locales } from "./src/payload/utils/locales";

const dev = process.env.NODE_ENV !== "production";
const projectDir = process.cwd();
loadEnvConfig(projectDir, dev);

const appURL = process?.env?.PAYLOAD_PUBLIC_APP_URL;

const cors =
  process?.env?.PAYLOAD_CORS?.split(",")
    ?.map((d) => d.trim())
    ?.filter(Boolean) ?? [];

const customHeaders: string[] = ["CS-App"];

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
    CivicSignalPages,
    MediaData,
    Users,
  ] as CollectionConfig[],
  globals: [Publication, Research, Main, Login, Registration, PasswordReset] as GlobalConfig[],
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
    user: Users.slug,
    components: {
      actions: [Actions],
    },
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
        alias: {
          ...config.resolve.alias,
          "#civicsignalblog": path.resolve(__dirname, "src"),
        },
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
      collections: [...applicationPages, "posts"],
      globals: ["settings-site"],
      uploadsCollection: "media",
      generateTitle: ({ doc }: any) => doc?.title?.value as string,
      generateURL: ({ doc }: any) =>
        doc?.slug?.value ? `${appURL}/${doc.slug.value}` : undefined,
    } as any),
    nestedDocs({
      collections: applicationPages,
      generateLabel: (_, doc) => doc.title as string,
      generateURL: (docs) =>
        docs.reduce((url, doc) => `${url}/${doc.slug}`, ""),
    }),
  ] as any[],
  telemetry: process?.env?.NODE_ENV !== "production",
  // We need to add a postMiddleware function to add support for custom headers in Payload
  express: {
    postMiddleware: [
      (_req: Request, res: Response, next: NextFunction) => {
        const existingHeaders =
          res.getHeader("Access-Control-Allow-Headers") || "";
        const controlHeaders = customHeaders
          .concat((existingHeaders as string).split(","))
          .filter((h) => h)
          .join(", ");
        res.header("Access-Control-Allow-Headers", controlHeaders);
        next();
      },
    ],
  },
});
