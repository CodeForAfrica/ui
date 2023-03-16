const baseURL = "https://dc.sourceafrica.net/api";

export default async function handler(req, res) {
  const { url } = req.query;
  try {
    const fullURL = `${baseURL}/oembed.json?url=${url}`;
    fetch(fullURL)
      .then((response) => response.json())
      .then((data) => {
        res.status(200).json(data);
      });
  } catch (error) {
    res.status(500).json({ error });
  }
}
