import { NextApiResponse, NextApiRequest } from "next";
import { processNewUsers } from "@/vpnmanager/lib/processUsers";

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const key: string = req.headers["x-api-key"] as string;
    const SECRET_TOKEN = process.env.SECRET_TOKEN;
    if (!key || key !== SECRET_TOKEN) {
      return res.status(403).json({ message: "INVALID_API_KEY" });
    }
    processNewUsers();
    return res.status(200).json({ message: "Process Started" });
  } catch (error) {}
}
export default handler;
