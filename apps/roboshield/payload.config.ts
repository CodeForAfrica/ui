import { loadEnvConfig } from "@next/env";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { s3Storage } from "@payloadcms/storage-s3";
import { nestedDocsPlugin } from "@payloadcms/plugin-nested-docs";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { slateEditor } from "@payloadcms/richtext-slate";
import { CollectionConfig, GlobalConfig, buildConfig } from "payload";
import Media from "./src/payload/collections/Media";
import Pages from "./src/payload/collections/Pages";
import Users from "./src/payload/collections/Users";
import Site from "./src/payload/globals/Site";
import { defaultLocale, locales } from "./src/payload/utils/locales";
import { nodemailerAdapter } from "@payloadcms/email-nodemailer";

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

const smtpAuthPass = process.env.SMTP_PASS || process.env.SENDGRID_API_KEY;
const smtpFromName =
  process.env.SMTP_FROM_NAME ||
  process.env.SENDGRID_FROM_NAME ||
  "Roboshield CMS";
const smtpFromAddress =
  process.env.SMTP_FROM_ADDRESS ||
  process.env.SENDGRID_FROM_EMAIL ||
  "noreply@codeforafrica.org";
const smtpPort = Number(process.env.SMTP_PORT || 587);
const smtpAuthUser = process.env.SMTP_USER || "apikey";
const smtpHost = process.env.SMTP_HOST || "smtp.sendgrid.net";

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
  i18n: {
    fallbackLanguage: "en",
    translations: {
      en: {
        "codeforafrica.validation": {
          uniquePlatforms: "Please select a unique platform",
        },
      },
    },
  },
  plugins: [
    seoPlugin({
      collections: ["pages"],
      globals: ["settings-site"],
      fields: ({ defaultFields }) => [
        // NOTE(kilemensi): This is only added to make sure Payload generate correct type
        ...defaultFields,
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
      generateTitle: ({ doc }: any) => (doc?.title as string) || "",
      generateURL: ({ doc }: any) =>
        doc?.slug ? `${appURL}/${doc?.slug}` : "",
    }),
    nestedDocsPlugin({
      collections: ["pages"],
      generateLabel: (_, doc) => (doc?.title as string) || "",
      generateURL: (docs) =>
        docs.reduce((url, doc) => `${url}/${doc?.slug}`, ""),
    }),
    s3Storage({
      collections: {
        media: true,
        "media-with-prefix": {
          prefix: "media",
        },
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
  ],
  ...(smtpAuthPass
    ? {
        email: nodemailerAdapter({
          defaultFromAddress: smtpFromAddress,
          defaultFromName: smtpFromName,
          transportOptions: {
            host: smtpHost,
            port: smtpPort,
            auth: {
              user: smtpAuthUser,
              pass: smtpAuthPass,
            },
          },
        }),
      }
    : {}),
  secret: process.env.PAYLOAD_SECRET ?? "",
  telemetry: process?.env?.NODE_ENV !== "production",
  typescript: {
    declare: false, // defaults to true if not set
  },
});
