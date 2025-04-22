import { NextApiRequest, NextApiResponse } from "next";

type User = object;

interface CustomNextApiRequest extends NextApiRequest {
  user: User;
  query: {
    slug: string;
    [key: string]: string | string[];
  };
}

export default async function handler(
  req: CustomNextApiRequest,
  res: NextApiResponse,
) {
  const { slug = "/" } = req.query;
  res.setDraftMode({ enable: true });
  const appUrl = new URL(process.env.NEXT_PUBLIC_APP_URL ?? "");
  const requestedUrl = new URL(slug, appUrl);
  if (requestedUrl.origin !== appUrl.origin) {
    return res.status(401).json({ message: "UNAUTHORIZED_REDIRECT" });
  }
  return res.redirect(requestedUrl.pathname);
}
