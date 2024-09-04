import { NextApiResponse, NextApiRequest } from "next";
import { processUserStats, getStats } from "@/vpnmanager/lib/userStatistics";

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const key: string = req.headers["x-api-key"] as string;
    const API_SECRET_KEY = process.env.API_SECRET_KEY;
    if (!(key && key === API_SECRET_KEY)) {
      return res.status(403).json({ message: "INVALID_API_KEY" });
    }
    if (req.method === "POST") {
      const data = await processUserStats();
      return res.status(200).json(data);
    }
    const response = await getStats(req.query as { [key: string]: string });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
}
export default handler;
