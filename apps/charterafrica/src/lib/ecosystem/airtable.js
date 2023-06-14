import fetchJson from "@/charterafrica/utils/fetchJson";

export const processToolFromAirtable = async () => {};

const cache = {};

function getFromCache(key) {
  const rawData = cache[key];
  if (rawData) {
    const { lastUpdated, value } = rawData;
    const fiveMinutesAgo = new Date();
    fiveMinutesAgo.setMinutes(fiveMinutesAgo.getMinutes() - 5);
    if (fiveMinutesAgo < lastUpdated) {
      return value;
    }
  }
  return null;
}

export async function schema(req) {
  const { url } = req.query;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.AIRTABLE_API_TOKEN}`,
  };
  if (getFromCache(url)) {
    return getFromCache(url);
  }
  const value = fetchJson.get(`https://api.airtable.com/v0${url}`, {
    headers,
  });
  cache[url] = { value, lastUpdated: new Date() };
  return value;
}
