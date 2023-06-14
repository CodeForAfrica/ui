import fetchJson from "@/charterafrica/utils/fetchJson";

export const processToolFromAirtable = async () => {};

const cache = {};
export async function schema(req) {
  const { url } = req.query;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.AIRTABLE_API_TOKEN}`,
  };
  if (cache[url]) {
    return cache[url];
  }
  const response = fetchJson.get(`https://api.airtable.com/v0${url}`, {
    headers,
  });
  cache[url] = response;
  return response;
}
