import fetchJson from "@/charterafrica/utils/fetchJson";

export const getSheetsPerSpreadsheet = async ({ spreadSheetId }) => {
  const params = {
    key: process.env.GOOGLE_API_KEY,
    fields: "sheets.properties.title",
  };
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadSheetId}`;
  const d = await fetchJson.get(url, { params });
  const { sheets } = d;
  if (sheets && sheets?.length) {
    return sheets.map((item) => item?.properties?.title);
  }
  return [];
};

export const fetchSpreadsheetPerSheet = async ({
  spreadSheetId,
  sheetName,
}) => {
  const range = `${sheetName}!a:z`;
  const params = {
    key: process.env.GOOGLE_API_KEY,
  };
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadSheetId}/values/${range}`;
  const { values } = await fetchJson.get(url, { params });
  if (values && values?.length) {
    const keys = values[0];
    const output = [];
    values?.forEach((data, i) => {
      if (i > 0) {
        const item = {};
        data.forEach((val, index) => {
          item[keys[index]] = val;
        });
        output.push(item);
      }
    });
    return output;
  }
  return [];
};

export default fetchSpreadsheetPerSheet;
