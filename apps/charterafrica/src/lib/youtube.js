import fetchJson from "@/charterafrica/utils/fetchJson";

async function fetchYoutube(path, playlistId) {
  const params = {
    playlistId,
    part: "snippet",
    maxResults: 10,
    key: process.env.GOOGLE_API_KEY,
  };
  const res = await fetchJson.get(
    `https://www.googleapis.com/youtube/v3${path}`,
    { params }
  );
  return res;
}

const fetchPlaylistItems = async (playlistId) =>
  fetchYoutube("/playlistItems", playlistId);

export default {
  fetchYoutube,
  fetchPlaylistItems,
};
