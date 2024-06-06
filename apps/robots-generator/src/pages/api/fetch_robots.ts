// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import parse from "robots-txt-parse";

type Data = {
  name?: string;
  error?: string;
  robots?: string;
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
  const res = await fetch(robotsUrl);
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
  const parsedRobotsFile = await parse(robotsFile);

  res.status(200).json(
    parsedRobotsFile,
  );

}
