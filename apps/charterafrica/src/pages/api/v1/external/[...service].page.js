import fetch from "node-fetch";

const fetchYoutubeApi = async (req, res) => {
  try {
    const { service, ...rest } = req.query;
    const url = service?.slice(1).join("/");
    const key = process.env.GOOGLE_API_KEY;
    const queryParams = { key, ...rest };
    const queryString = new URLSearchParams(queryParams).toString();
    const youtubeBaseUrl = `https://www.googleapis.com/youtube/v3`;
    const response = await fetch(`${youtubeBaseUrl}/${url}?${queryString}`);
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

// We do not want apiKeys etc publicly availabe on the frontend
export default async function handler(req, res) {
  try {
    const {
      query: { service },
    } = req;
    switch (service?.[0]) {
      case "youtube":
        return fetchYoutubeApi(req, res);
      default:
        break;
    }
    return res.status(404).json({ error: "NOT FOUND" });
  } catch (error) {
    return res.status(500).json(error);
  }
}
