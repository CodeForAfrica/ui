import fetchJson from "@/charterafrica/utils/fetchJson";

export const processToolFromAirtable = async () => {};

export async function airtableSchema(req) {
  const { url } = req.query;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.AIRTABLE_API_TOKEN}`,
  };
  const response = await fetchJson.get(`https://api.airtable.com/v0${url}`, {
    headers,
  });
  return response;
}
