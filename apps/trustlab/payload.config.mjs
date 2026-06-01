import path from "path";
import { fileURLToPath } from "url";

import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { nodemailerAdapter } from "@payloadcms/email-nodemailer";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import sharp from "sharp";

import {
  Donors,
  Media,
  Pages,
  Posts,
  Partners,
  Tags,
  Users,
  Reports,
  Playbooks,
  Toolkits,
  Opportunities,
  Organisations,
} from "@/trustlab/payload/collections";
import SiteSettings from "@/trustlab/payload/globals";
import plugins from "@/trustlab/payload/plugins";
import { defaultLocale, locales } from "@/trustlab/payload/utils/locales";
import { site } from "@/trustlab/utils";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const normaliseOrigin = (value) => value?.trim()?.replace(/\/+$/, "") ?? "";

const normaliseOrigins = (value) =>
  value
    ?.split(",")
    .map((d) => d.trim())
    .map((d) => normaliseOrigin(d))
    .filter(Boolean) ?? [];

const serverUrl = normaliseOrigin(site.url) || "";
const cors = normaliseOrigins(process.env.PAYLOAD_CORS?.trim() || serverUrl);
const csrf = normaliseOrigins(process.env.PAYLOAD_CSRF?.trim() || serverUrl);

let nodemailerAdapterArgs;
if (process.env.SMTP_HOST && process.env.SMTP_PASS) {
  const smtpPort = Number(process.env.SMTP_PORT) || 587;
  nodemailerAdapterArgs = {
    defaultFromAddress:
      process.env.SMTP_FROM_ADDRESS || "noreply@trustlab.africa",
    defaultFromName: process.env.SENDGRID_FROM_NAME || site.name,
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
  };
}
const email = nodemailerAdapter(nodemailerAdapterArgs);

export default buildConfig({
  admin: {
    importMap: {
      baseDir: path.resolve(__dirname),
    },
    livePreview: {
      url: site.url,
      collections: ["pages"],
      globals: ["site-settings"],
    },
  },
  collections: [
    // Group: Publication
    Media,
    Pages,
    Posts,
    Tags,
    // Group: Project
    Donors,
    Organisations,
    Partners,
    Playbooks,
    Toolkits,
    // Group: Settings
    Reports,
    Users,
    Opportunities,
  ],
  cors,
  csrf,
  db: mongooseAdapter({
    url: process.env.DATABASE_URL ?? false,
  }),
  email,
  editor: lexicalEditor(),
  globals: [SiteSettings],
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
  serverURL: serverUrl,
  sharp,
  telemetry: process.env.NEXT_TELEMETRY_DISABLED === "0",
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
});
