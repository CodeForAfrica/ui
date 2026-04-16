import { getSitemapXml } from "@/trustlab/lib/data";

export default async function handler(_req, res) {
  const sitemapXml = await getSitemapXml();
  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.send(sitemapXml);
}
