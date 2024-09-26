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
import resolveTsconfigPathsToAlias from "./tsconfigPathToWebpackAlias";
import Authors from "./src/payload/collections/Research/Authors";
import Media from "./src/payload/collections/Research/Media";
import Pages from "./src/payload/collections/Research/Pages";
import CivicSignalPages from "./src/payload/collections/Main/Pages";
import Posts from "./src/payload/collections/Research/Posts";
import Publication from "./src/payload/globals/Publication";
import Research from "./src/payload/globals/Site/research";
import Main from "./src/payload/globals/Site/main";
import Tags from "./src/payload/collections/Research/Tags";
import Users from "./src/payload/collections/Users";
import { defaultLocale, locales } from "./src/payload/utils/locales";
import Actions from "./src/payload/components/actions";

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
    CivicSignalPages,
    Users,
  ] as CollectionConfig[],
  globals: [Publication, Research, Main] as GlobalConfig[],
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
          ...(config.resolve.alias || {}),
          ...resolveTsconfigPathsToAlias({
            tsConfigPath: "tsconfig.json",
            webpackConfigBasePath: "./",
          }),
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
