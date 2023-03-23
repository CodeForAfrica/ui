const baseURL = "https://dc.sourceafrica.net/api/search.json";

export default async function handler(req, res) {
  const { query } = req;
  const encodedQuery = new URLSearchParams(query).toString();
  try {
    const fullURL = `${baseURL}?${encodedQuery}`;
    const response = await fetch(fullURL);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
}
