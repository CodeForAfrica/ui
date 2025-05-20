import sharp from "sharp";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { nodemailerAdapter } from "@payloadcms/email-nodemailer";
import { buildConfig, CollectionConfig, GlobalConfig } from "payload";
import path from "path";
import { fileURLToPath } from "url";
import Users from "@/trustlab/payload/collections/Users";
import Media from "@/trustlab/payload/collections/Media";
import plugins from "@/trustlab/payload/plugins";
import Pages from "@/trustlab/payload/collections/Pages";
import SiteSettings from "@/trustlab/payload/globals";
import { defaultLocale, locales } from "@/trustlab/payload/utils/locales";
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const cors =
  process?.env?.PAYLOAD_CORS?.split(",")
    .map((d) => d.trim())
    .filter(Boolean) ?? [];

const csrf =
  process?.env?.PAYLOAD_CSRF?.split(",")
    .map((d) => d.trim())
    .filter(Boolean) ?? [];

let email = nodemailerAdapter();
if (process.env.SMTP_HOST && process.env.SMTP_PASS) {
  const smtpPort = Number(process.env.SMTP_PORT) || 587;
  email = nodemailerAdapter({
    defaultFromAddress:
      process.env.SMTP_FROM_ADDRESS || "noreply@trustlab.africa",
    defaultFromName: process.env.SENDGRID_FROM_NAME || "TrustLab CMS",
    // Any Nodemailer transport can be used
    transportOptions: {
      host: process.env.SMTP_HOST,
      port: smtpPort,
      secure: smtpPort === 465, // true for port 465, false (the default) for others
      auth: {
        user: process.env.SMTP_USER || "apikey",
        pass: process.env.SMTP_PASS,
      },
    },
  });
}

export default buildConfig({
  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      url: process.env.NEXT_PUBLIC_APP_URL,
      collections: ["pages"],
      globals: ["site-settings"],
    },
  },
  collections: [Pages, Media, Users] as CollectionConfig[],
  cors,
  csrf,
  db: mongooseAdapter({
    url: process.env.MONGO_URL || "",
  }),
  email,
  editor: lexicalEditor(),
  globals: [SiteSettings] as GlobalConfig[],
  ...(locales?.length
    ? {
        localization: {
          locales,
          defaultLocale,
          fallback: true,
        },
      }
    : undefined),
  plugins: [...plugins],
  secret: process.env.PAYLOAD_SECRET || "",
  serverURL: process.env.NEXT_PUBLIC_APP_URL,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
