import fetchJson from "@/charterafrica/utils/fetchJson";

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.AIRTABLE_API_TOKEN}`,
};

const getListFromAirtable = async ({ baseId, tableIdOrName, offset }) => {
  const url = `https://api.airtable.com/v0/${baseId}/${tableIdOrName}`;
  const params = { offset };
  const res = await fetchJson.get(url, { params, headers });
  if (!res.offset) {
    return res.records;
  }
  const results = await getListFromAirtable({
    baseId,
    tableIdOrName,
    offset: res.offset,
  });
  return [...res.records, ...results];
};

export default getListFromAirtable;
