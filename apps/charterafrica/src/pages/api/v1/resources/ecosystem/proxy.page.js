import fetchJson from "@/charterafrica/utils/fetchJson";

export default async function handler(req, res) {
  const { source, url } = req.query;
  try {
    if (source === "airtable") {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.AIRTABLE_API_TOKEN}`,
      };
      const response = await fetchJson.get(
        `https://api.airtable.com/v0${url}`,
        {
          headers,
        }
      );
      return res.status(200).json(response);
    }
    return res.status(404).json({ message: "SOURCE NOT FOUND" });
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
}
