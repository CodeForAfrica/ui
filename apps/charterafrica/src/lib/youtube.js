import fetchJson from "@/charterafrica/utils/fetchJson";

export async function fetchResource(path, options) {
  const params = {
    ...options,
    key: process.env.GOOGLE_API_KEY,
  };
  const res = await fetchJson.get(
    `https://www.googleapis.com/youtube/v3${path}`,
    { params }
  );
  return res;
}

export async function fetchPlaylistItems(playlistId, options) {
  const params = {
    maxResults: 100,
    part: "snippet",
    ...options,
    playlistId,
  };

  return fetchResource("/playlistItems", params);
}

export default {
  fetchResource,
  fetchPlaylistItems,
};
