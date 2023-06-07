import Airtable from "airtable";

const airtable = new Airtable({
  apiKey: process.env.AIRTABLE_API_TOKEN,
});

const getListFromAirtable = async ({ baseId, tableIdOrName }) => {
  const base = airtable.base(baseId);
  const records = await base(tableIdOrName).select().all();
  return records;
};

export default getListFromAirtable;
