// import path from "path";

import path from "path";

import { buildConfig } from "payload/config";

import Page from "./src/collections/Page";

const serverURL = process.env.PAYLOAD_PUBLIC_APP_URL;

export default buildConfig({
  serverURL,
  collections: [Page],
  admin: {
    webpack: (config) => ({
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          "@/charterafrica": path.resolve(__dirname, "src/"),
        },
        fallback: {
          ...config.resolve.fallback,
          "process/browser": false,
        },
      },
    }),
  },
});
