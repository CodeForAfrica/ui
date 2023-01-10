import { cloudStorage } from "@payloadcms/plugin-cloud-storage";
import { s3Adapter } from "@payloadcms/plugin-cloud-storage/s3";
import seo from "@payloadcms/plugin-seo";
import { buildConfig } from "payload/config";

import Media from "./src/payload/collections/Media";
import Pages from "./src/payload/collections/Pages";
import Footer from "./src/payload/globals/Footer";
import Navigation from "./src/payload/globals/Navigation";
import Settings from "./src/payload/globals/Settings";
import { defaultLocale, locales } from "./src/payload/utils/locales";

const appURL = process.env.PAYLOAD_PUBLIC_APP_URL;

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
  globals: [Navigation, Settings, Footer],
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
  i18n: {
    fallbackLng: "en", // default
    debug: false, // default
    resources: {
      en: {
        "charterafrica.site": {
          uniqueLocales: "Locales must be unique",
        },
      },
      fr: {
        "charterafrica.site": {
          uniqueLocales: "Les locaux doivent être uniques",
        },
      },
      pt: {
        "charterafrica.site": {
          uniqueLocales: "Os locais devem ser únicos",
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
    seo({
      collections: ["pages"],
      globals: ["settings"],
      uploadsCollection: "media",
      generateTitle: ({ doc }) => doc?.title?.value,
      generateURL: ({ doc, locale }) =>
        doc?.slug?.value ? `${appURL}/${locale}/${doc.slug.value}` : undefined,
    }),
  ],
});
