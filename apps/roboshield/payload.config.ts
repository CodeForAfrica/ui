import { loadEnvConfig } from "@next/env";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { cloudStoragePlugin } from "@payloadcms/plugin-cloud-storage";
import { s3Adapter } from "@payloadcms/plugin-cloud-storage/s3";
import { nestedDocsPlugin } from "@payloadcms/plugin-nested-docs";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { slateEditor } from "@payloadcms/richtext-slate";
import { CollectionConfig, GlobalConfig, buildConfig } from "payload";
import { Config } from "./payload-types";
import Media from "./src/payload/collections/Media";
import Pages from "./src/payload/collections/Pages";
import Users from "./src/payload/collections/Users";
import Site from "./src/payload/globals/Site";
import { defaultLocale, locales } from "./src/payload/utils/locales";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

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
    url: process.env.MONGO_URL ?? false,
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
  },
  cors,
  csrf,
  /*i18n: {
    fallbackLng: "en", // default
    debug: false, // default
    resources: {
      en: {
        "codeforafrica.validation": {
          uniquePlatforms: "Please select a unique platform",
        },
      },
    },
  },*/
  plugins: [
    cloudStoragePlugin({
      collections: {
        media: {
          adapter,
          prefix: "media",
        },
      },
    }),
    seoPlugin({
      collections: ["pages"],
      globals: ["settings-site"],
      fields: [
        // NOTE(kilemensi): This is only added to make sure Payload generate correct type
        {
          name: "canonical",
          type: "text",
          admin: {
            disabled: true,
            description:
              "https://developers.google.com/search/docs/crawling-indexing/canonicalization",
          },
        },
      ],
      uploadsCollection: "media",
      generateTitle: ({ doc }: any) => doc?.title?.value as string,
      generateURL: ({ doc }: any) =>
        doc?.slug?.value ? `${appURL}/${doc.slug.value}` : undefined,
    } as any),
    nestedDocsPlugin({
      collections: ["pages"],
      generateLabel: (_, doc) => doc.title as string,
      generateURL: (docs) =>
        docs.reduce((url, doc) => `${url}/${doc.slug}`, ""),
    }),
  ] as any[],
  secret: process.env.PAYLOAD_SECRET || "",
  telemetry: process?.env?.NODE_ENV !== "production",
  typescript: {
    declare: false, // defaults to true if not set
  },
});

declare module "payload" {
  export interface PayloadGeneratedTypes extends Config {}
}
