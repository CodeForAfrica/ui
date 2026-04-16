import * as Sentry from "@sentry/nextjs";

import { getSitemapXml } from "@/trustlab/lib/data";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    res.status(405).end();
    return;
  }

  try {
    const sitemapXml = await getSitemapXml();
    res.setHeader(
      "Cache-Control",
      "public, max-age=3600, stale-while-revalidate=86400",
    );
    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.send(sitemapXml);
  } catch (error) {
    Sentry.captureException(error);
    res.status(500).end();
  }
}
