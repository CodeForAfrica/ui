import { getRobotsTxt } from "@/trustlab/lib/data";

export default async function handler(_req, res) {
  const robotsTxt = await getRobotsTxt();
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.send(robotsTxt);
}
