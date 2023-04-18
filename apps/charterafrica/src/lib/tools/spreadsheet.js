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

export const getSpreadSheetSheetTitles = async ({ spreadSheetId }) => {
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

export const fetchSpreadSheetSheetByName = async ({
  spreadSheetId,
  sheetName,
}) => {
  const { values } = await fetchSpreadsheet(
    `/${spreadSheetId}/values/${sheetName}`
  );
  if (values?.length) {
    const keys = values.shift();
    const output = values.map((data) => {
      const item = {};
      data.forEach((val, index) => {
        item[keys[index]] = val;
      });
      return item;
    });
    return output;
  }
  return [];
};

export default fetchSpreadSheetSheetByName;
