import fetchJson from "@/charterafrica/utils/fetchJson";

export async function fetchSpreadsheet(path, options) {
  const params = {
    ...options,
    key: process.env.GOOGLE_API_KEY,
  };
  const res = await fetchJson.get(
    `https://sheets.googleapis.com/v4/spreadsheets${path}`,
    { params }
  );
  return res;
}

export const getSheetsPerSpreadsheet = async ({ spreadSheetId }) => {
  const params = {
    fields: "sheets.properties.title",
  };
  const d = await fetchSpreadsheet(`/${spreadSheetId}`, params);
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
  const { values } = await fetchSpreadsheet(
    `/${spreadSheetId}/values/${range}`
  );
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
