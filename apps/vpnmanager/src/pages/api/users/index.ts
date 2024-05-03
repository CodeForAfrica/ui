import local from "@/vpnmanager/lib/data/local";
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const users = local.readJsonFile();
    return res.status(200).json(users)
}
