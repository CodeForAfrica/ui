// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { formatRobots } from "@/robots-generator/lib/format-robots";
import type { NextApiRequest, NextApiResponse } from "next";
import parse from "robots-txt-parse";

type Data = {
  error?: string;
  robots?: any;
};

function getRobotsUrl(url: string) {
  try {
    const parsedUrl = new URL(url);
    const robotsUrl = `${parsedUrl.protocol}//${parsedUrl.hostname}/robots.txt`;
    return robotsUrl;
  } catch (e) {
    console.error("Invalid URL:", e);
    return null;
  }
}

async function fetchRobots(robotsUrl: string) {
  // TODO: investigate why sometimes the fetch fails. i.e we get access denied
  const res = await fetch(robotsUrl, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
    },
  });
  const data = await res.text();
  return data;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method !== "POST") {
    throw new Error("Method not allowed");
  }
  const { url } = req.body;
  if (!url) {
    res.status(400).json({ error: "Missing URL" });
    return;
  }
  const robotsUrl = getRobotsUrl(url);
  if (!robotsUrl) {
    res.status(400).json({ error: "Invalid URL" });
    return;
  }

  const robotsFile = await fetchRobots(robotsUrl);
  const parsedRobots = await parse(robotsFile);

  const formatedRobots = formatRobots(parsedRobots);

  res.status(200).json({
    robots: formatedRobots,
  });
}
