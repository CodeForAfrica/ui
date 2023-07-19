import { buildConfig } from "payload/config";
import Pages from "./src/payload/collections/Pages";
import { CollectionConfig } from "payload/types";
import dotenv from "dotenv";

dotenv.config();
dotenv.config({ path: "./.env.local" });

const appURL = process?.env?.CFA_PAYLOAD_PUBLIC_APP_URL;

export default buildConfig({
  serverURL: appURL,
  collections: [Pages] as CollectionConfig[],
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
  },
});
