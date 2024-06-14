// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import parse from "robots-txt-parse";

import { validateRobots, formatRobots } from "@/robots-generator/lib/robots";
import { getRobotsUrl } from "@/robots-generator/utils/urls";

type Data = {
  error?: string;
  robots?: any;
};

async function fetchRobots(robotsUrl: string) {
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

  if (!validateRobots(robotsFile)) {
    res
      .status(400)
      .json({ error: "Invalid robots.txt file", robots: robotsFile });
    return;
  }

  const parsedRobots = await parse(robotsFile);

  const formatedRobots = formatRobots(parsedRobots);

  res.status(200).json({
    robots: formatedRobots,
  });
}
