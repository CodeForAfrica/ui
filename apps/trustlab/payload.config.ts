import sharp from "sharp";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
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
    ?.map((d) => d.trim())
    ?.filter(Boolean) ?? [];

const csrf =
  process?.env?.PAYLOAD_CSRF?.split(",")
    ?.map((d) => d.trim())
    ?.filter(Boolean) ?? [];

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
  editor: lexicalEditor(),
  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Pages] as CollectionConfig[],
  cors,
  csrf,
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
  secret: process.env.PAYLOAD_SECRET || "",
  db: mongooseAdapter({
    url: process.env.MONGO_URL || "",
  }),
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  plugins: [...plugins],

  sharp,
});
