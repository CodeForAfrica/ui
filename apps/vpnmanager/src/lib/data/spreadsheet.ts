import { google } from "googleapis";

import { SheetRow } from "@/vpnmanager/types";
import { toCamelCase } from "@/vpnmanager/utils";

const SHEET_ID = process.env.NEXT_APP_GOOGLE_SHEET_ID;
const RANGE = process.env.NEXT_APP_GOOGLE_SHEET_RANGE;

function gSheet() {
  const auth = new google.auth.GoogleAuth({
    keyFile: process.env.NEXT_APP_GOOGLE_CREDENTIALS,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
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

async function newUsers() {
  const data = await list(SHEET_ID, RANGE);
  return data.filter(
    (row: SheetRow) => row.emailAddress && row.keySent?.trim() !== "Yes",
  );
}

export async function updateSheet(row: Partial<SheetRow>) {
  const { emailAddress, outlineKeyCreated, keySent } = row;
  const sheets = gSheet();
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: RANGE,
  });
  const rows = response.data.values;
  if (!rows?.length) {
    return null;
  }
  const titles = rows[0];
  const emailIndex = titles.findIndex(
    (item) => item?.toLowerCase()?.trim() === "email address",
  );
  const rowIndexToUpdate = rows.findIndex(
    (item: string[]) => item[emailIndex] === emailAddress,
  );
  const rowToUpdate = rows[rowIndexToUpdate];
  if (outlineKeyCreated) {
    const outlineKeyCreatedIndex = titles.findIndex(
      (item) => item?.toLowerCase()?.trim() === "outline key created?",
    );
    rowToUpdate[outlineKeyCreatedIndex] = outlineKeyCreated;
  }
  if (keySent) {
    const keySentIndex = titles.findIndex(
      (item) => item?.toLowerCase()?.trim() === "key sent",
    );
    rowToUpdate[keySentIndex] = keySent;
  }
  const validRange = RANGE?.split("!")?.[0] + `!A${rowIndexToUpdate + 1}`;
  return sheets.spreadsheets.values.update({
    spreadsheetId: SHEET_ID,
    range: validRange,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [rowToUpdate],
    },
  });
}

export default {
  list,
  newUsers,
  updateSheet,
};
