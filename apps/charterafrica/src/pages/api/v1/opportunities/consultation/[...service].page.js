const documents = async (req, res) => {
  const baseURL = "https://dc.sourceafrica.net/api/oembed.json";
  const { url } = req.query;
  try {
    const fullURL = `${baseURL}?url=${url}`;
    const response = await fetch(fullURL);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const youtube = async (req, res) => {
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

const serviceMap = {
  documents,
  youtube,
};

// We do not want apiKeys etc publicly availabe on the frontend
export default async function handler(req, res) {
  try {
    const {
      query: { service },
    } = req;
    const response = serviceMap[service?.[0]];
    if (response) {
      return response(req, res);
    }
    return res.status(404).json({ error: "NOT FOUND" });
  } catch (error) {
    return res.status(500).json(error);
  }
}
