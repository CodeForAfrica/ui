import fetch from "node-fetch";
const fetchYoutubeApi = async (req, res) => {
  const youtubeBaseUrl = "https://www.googleapis.com/youtube/v3";
  const url = "";
  const response = await fetch(`${youtubeBaseUrl}${url}`);
  const data = await response.json();
  res.status(200).json(data);
};

// We do not want apiKeys etc publicly availabe on the frontend
export default async function handler(req, res) {
  try {
    const {
      query: { service },
    } = req;
    let response;
    switch (service) {
      case "youtube":
        return fetchYoutubeApi(req, res);
      default:
        break;
    }
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
}
