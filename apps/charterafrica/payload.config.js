import { cloudStorage } from "@payloadcms/plugin-cloud-storage";
import { s3Adapter } from "@payloadcms/plugin-cloud-storage/s3";
import seo from "@payloadcms/plugin-seo";
import { buildConfig } from "payload/config";

import Media from "./src/payload/collections/Media";
import Pages from "./src/payload/collections/Pages";
import Navigation from "./src/payload/globals/Navigation";
import Site from "./src/payload/globals/Site";

const appURL = process.env.PAYLOAD_PUBLIC_APP_URL;
const locales = process.env.PAYLOAD_PUBLIC_LOCALES?.split(",")
  ?.map((l) => l.trim())
  .filter(Boolean);
const defaultLocale =
  process.env.PAYLOAD_PUBLIC_DEFAULT_LOCALE?.trim() || locales?.[0];

const adapter = s3Adapter({
  config: {
    credentials: {
      // When payload generates browser bundle, process.env will be undfined,
      // hence the need for ?. This **SHOULDN'T** be an issue for the
      // server-side bundle.
      // TODO: Dig deeper into Payload server-side/browser bundle build steps.
      accessKeyId: process?.env?.S3_ACCESS_KEY_ID,
      secretAccessKey: process?.env?.S3_SECRET_ACCESS_KEY,
    },
  },
  bucket: process?.env?.S3_BUCKET,
});

export default buildConfig({
  serverURL: appURL,
  collections: [Media, Pages],
  globals: [Navigation, Site],
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
    webpack: (config) => ({
      ...config,
      resolve: {
        ...config.resolve,
        fallback: {
          ...config.resolve.fallback,
          "process/browser": false,
        },
      },
    }),
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
    seo({
      collections: ["pages"],
      globals: ["site"],
      uploadsCollection: "media",
      generateTitle: ({ doc }) => doc?.title?.value,
      generateURL: ({ doc, locale }) =>
        doc?.slug?.value ? `${appURL}/${locale}/${doc.slug.value}` : undefined,
    }),
  ],
});
