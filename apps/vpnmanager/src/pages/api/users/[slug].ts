import local from "@/vpnmanager/lib/data/local";
import type { NextApiRequest, NextApiResponse } from 'next'

async function listUsers(req: NextApiRequest, res: NextApiResponse){
    const users = local.readJsonFile();
    return res.status(200).json(users)
}

async function getUser(req: NextApiRequest, res: NextApiResponse){
    const users = local.readJsonFile();
    const { slug = '' } = req.query;
    const email: string = slug as string;
    const user = users.find(({ emailAddress }) => emailAddress?.toLocaleLowerCase() === email?.toLocaleLowerCase());
    if (!user) {
        return res.status(404).json({ message: `A user with email address "${slug}" does not exist`})
    }
    return res.status(200).json(user)
}

const functionMap: any = {
    list: listUsers
}

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const { slug = '' } = req.query;
    const action = functionMap[slug?.toLocaleString()?.toLocaleLowerCase()] ?? getUser;
    return action(req, res);
}
