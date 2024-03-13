import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_APP_SENTRY_DSN,
  environment: process.env.SENTRY_ENV,
  tracesSampleRate: 1,
  debug: false,
});
