import sharp from "sharp";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { buildConfig } from "payload";
import path from "path";
import { fileURLToPath } from "url";
import Users from "@/trustlab/payload/collections/Users";
import Media from "@/trustlab/payload/collections/Media";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  editor: lexicalEditor(),
  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },

  collections: [Users, Media],

  secret: process.env.PAYLOAD_SECRET || "",
  db: mongooseAdapter({
    url: process.env.MONGO_URL || "",
  }),
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },

  sharp,
});
