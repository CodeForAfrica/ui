import * as Sentry from "@sentry/nextjs";

export function initSentry() {
  Sentry.init();
}
