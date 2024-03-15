import { google } from "googleapis";

import { SheetRow } from "@/vpnmanager/types";
import { toCamelCase } from "@/vpnmanager/utils";

function gSheet() {
  const auth = new google.auth.GoogleAuth({
    keyFile: process.env.NEXT_APP_GOOGLE_CREDENTIALS,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });
  return google.sheets({ version: "v4", auth });
}

async function list(
  spreadsheetId?: string,
  range?: string,
): Promise<SheetRow[]> {
  if (!spreadsheetId || !range) {
    return [];
  }
  const sheets = gSheet();
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  const rows = response.data.values;
  if (!rows || !rows?.length) {
    return [];
  }
  const titles = rows[0];

  const data = rows.slice(1).map((row: any) => {
    return titles.reduce((acc, curr, index) => {
      const key = toCamelCase(curr);
      const value = row[index];
      return {
        ...acc,
        [key]: value,
      };
    }, {});
  });

  return data;
}

async function newHires() {
  const spreadsheetId = process.env.NEXT_APP_GOOGLE_SHEET_ID;
  const range = process.env.NEXT_APP_GOOGLE_SHEET_RANGE;
  const data = await list(spreadsheetId, range);
  return data.filter(
    (row: SheetRow) => row.emailAddress && row.keySent !== "Yes",
  );
}

export default {
  list,
  newHires,
};
