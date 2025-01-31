// Next.js requires this to be exported as register https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation
// eslint-disable-next-line import/prefer-default-export
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./sentry.server.config");
  }
}
