export const locales = process.env.PAYLOAD_PUBLIC_LOCALES?.split(",")
  ?.map((l) => l.trim())
  .filter(Boolean) || ["en"];
export const defaultLocale =
  process.env.PAYLOAD_PUBLIC_DEFAULT_LOCALE?.trim() || locales?.[0];
