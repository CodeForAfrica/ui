import { NextApiResponse, NextApiRequest } from "next";
import { processNewUsers } from "@/vpnmanager/lib/processUsers";

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    processNewUsers();
    return res.status(200).json({ message: "Process Started" });
  } catch (error) {
    return res.status(500).json(error);
  }
}
export default handler;
