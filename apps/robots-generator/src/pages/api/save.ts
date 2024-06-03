import type { NextApiRequest, NextApiResponse } from "next";

const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("database.db", (err: any) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the database.");
});

db.serialize(() => {
  db.run(
    `
    CREATE TABLE IF NOT EXISTS robots (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      url TEXT,
      robots TEXT,
      defaultAccess TEXT,
      crawlDelay INTEGER,
      cachedDelay INTEGER,
      visitTime TEXT,
      sitemaps TEXT,
      disallowedPaths TEXT,
      platform TEXT,
      bots TEXT
    );
   `,
  );
});

type Data = {
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method !== "POST") {
    throw new Error("Method not allowed");
  }
  const { data } = req.body;
  if (!data) {
    res.status(400).json({ error: "No Data provided" });
    return;
  }

  db.run(
    `
    INSERT INTO robots (url, robots, defaultAccess, crawlDelay, cachedDelay, visitTime, sitemaps, disallowedPaths, platform, bots)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `,
    [
      data.url,
      data.robots,
      data.defaultAccess,
      data.crawlDelay,
      data.cachedDelay,
      data.visitTime,
      data.sitemaps.join("\n"),
      data.disallowedPaths.join("\n"),
      data.platform,
      JSON.stringify(data.bots),
    ],
    (err: any) => {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
    },
  );

  res.status(200).json({});
}
