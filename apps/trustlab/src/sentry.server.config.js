// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

import { site } from "@/trustlab/utils";

Sentry.init({
  dsn: site.sentryDsn,

  // Sample 10% of server traces by default; override (0-1) with
  // SENTRY_TRACES_SAMPLE_RATE. Requests from the browser keep the browser's
  // sampling decision (instrumentation-client).
  tracesSampleRate: Number(process.env.SENTRY_TRACES_SAMPLE_RATE || 0.1),

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
