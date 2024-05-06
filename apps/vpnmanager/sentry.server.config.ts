import * as Sentry from "@sentry/nextjs";

const options =  {
  dsn: process.env.SENTRY_DSN,
  environment: process.env.SENTRY_ENV ?? "local",
  tracesSampleRate: 1,
}

Sentry.init(options);

export function initSentry() {
  Sentry.init(options);
}
