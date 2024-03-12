import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_APP_SENTRY_DSN,
  tracesSampleRate: 1,
  environment: process.env.SENTRY_ENV,
  debug: false,
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  integrations: [
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
});
