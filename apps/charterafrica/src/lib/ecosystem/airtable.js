import fetchJson from "@/charterafrica/utils/fetchJson";

export const processToolFromAirtable = async () => {};

export async function schema(req) {
  const { url } = req.query;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.AIRTABLE_API_TOKEN}`,
  };
  return fetchJson.get(`https://api.airtable.com/v0${url}`, {
    headers,
  });
}
