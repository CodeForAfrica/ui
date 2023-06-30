import * as Sentry from "@sentry/nextjs";

import { fetchResource } from "@/charterafrica/lib/youtube";

async function multimedia(req, res) {
  const { pathname, ...rest } = req.query;

  const data = await fetchResource(pathname, rest);
  return res.status(200).json(data);
}

const fetchMediaMap = {
  multimedia,
};

export default async function handler(req, res) {
  const { media } = req.query;
  const fetchMedia = fetchMediaMap[media];
  if (fetchMedia) {
    try {
      return fetchMedia(req, res);
    } catch (err) {
      Sentry.captureException(err);
      return res.status(500).json(err);
    }
  }
  return res.status(404).json({ message: "UNKNOWN_MEDIA", media });
}
