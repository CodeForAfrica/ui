// Called on the server only.
export const locales = process.env.LOCALES?.split(",")
  .map((l) => l.trim())
  .filter(Boolean) || ["en"];
export const defaultLocale = process.env.DEFAULT_LOCALE?.trim() || locales[0];
