import * as Sentry from "@sentry/nextjs";

import { getSitemapXml } from "@/trustlab/lib/data";

export async function getServerSideProps({ res }) {
  try {
    const sitemapXml = await getSitemapXml();
    res.setHeader(
      "Cache-Control",
      "public, max-age=3600, stale-while-revalidate=86400",
    );
    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.write(sitemapXml);
  } catch (error) {
    Sentry.captureException(error);
    res.statusCode = 500;
  }
  res.end();
  return {
    props: {},
  };
}

export default function SitemapXml() {
  // All work is done and returned in getServerSideProps.
  return null;
}
