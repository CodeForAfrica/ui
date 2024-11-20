import { NextApiResponse, NextApiRequest } from "next";
import { processNewUsers } from "@/vpnmanager/lib/processUsers";
import { RestMethodFunctions, RestMethods } from "@/vpnmanager/types";
import { OutlineVPN } from "@/vpnmanager/lib/outline";

async function users() {
  const vpnManager = new OutlineVPN({
    apiUrl: process.env.NEXT_APP_VPN_API_URL as string,
  });
  const out = await vpnManager.getUsers();
  return out;
}
const methodToFunction: RestMethodFunctions = {
  POST: processNewUsers,
  GET: users,
};

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const statFunc = methodToFunction[req.method as RestMethods];
    if (!statFunc) {
      return res.status(405).json({ message: "Method not allowed" });
    }
    const data = await statFunc(req);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
}
export default handler;
