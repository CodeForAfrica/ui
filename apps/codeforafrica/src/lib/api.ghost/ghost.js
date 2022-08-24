import GhostContentAPI from "@tryghost/content-api";

export default function initializeContentAPI() {
  return new GhostContentAPI({
    url: process.env.GHOST_URL,
    key: process.env.GHOST_API_KEY,
    version: process.env.GHOST_API_VERSION || "v5.0",
  });
}
