import type { GetServerSideProps } from "next";
import type { Payload } from "payload";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import payloadConfig from "../payload.config";
import type { RobotsGlobal } from "../src/payload/globals/robots";

let payloadClientPromise: Promise<Payload> | null = null;

const getPayloadClient = () => {
  if (!payloadClientPromise) {
    payloadClientPromise = getPayloadHMR({
      config: payloadConfig,
      generateFileChanges: false,
    });
  }
  return payloadClientPromise;
};

const RobotsTxt = () => null;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const payload = await getPayloadClient();
  const robots = await payload.findGlobal<RobotsGlobal>({ slug: "robots" });
  const host = req.headers.host ?? "";
  const matchingRule =
    robots?.rules?.find(({ hostnamePattern }) => {
      try {
        return new RegExp(hostnamePattern, "i").test(host);
      } catch {
        return false;
      }
    }) ?? null;

  const content = (
    matchingRule?.content ??
    robots?.fallback ??
    "User-agent: *\nDisallow: /"
  ).trim();
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.write(content.endsWith("\n") ? content : `${content}\n`);
  res.end();

  return { props: {} };
};

export default RobotsTxt;
