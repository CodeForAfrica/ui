import fetchJson from "@/charterafrica/utils/fetchJson";

async function fetchYoutube(path, playlistId) {
  const params = {
    playlistId,
    part: "snippet",
    maxResults: 10,
    key: process.env.GOOGLE_MAPS_API_KEY,
  };
  const res = await fetchJson.get(
    `https://www.googleapis.com/youtube/v3${path}`,
    { params }
  );
  return res;
}

export default fetchYoutube;
