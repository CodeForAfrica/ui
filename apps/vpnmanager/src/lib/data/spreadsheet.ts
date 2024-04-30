import { google } from "googleapis";

import { SheetRow } from "@/vpnmanager/types";
import { toCamelCase } from "@/vpnmanager/utils";

function gSheet() {
  const auth = new google.auth.GoogleAuth({
    keyFile: process.env.NEXT_APP_GOOGLE_CREDENTIALS,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  return google.sheets({ version: "v4", auth });
}

async function fetchRange(
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
  const spreadsheetId = process.env.NEXT_APP_GOOGLE_SHEET_ID;
  const range = `${process.env.NEXT_APP_GOOGLE_SHEET_NAME}!A:Z`;
  const data = await fetchRange(spreadsheetId, range);
  return data.filter(
    (row: SheetRow) => row.emailAddress && row.keySent?.trim() !== "Yes",
  );
}

function processRow(rows: string[][], row: Partial<SheetRow>) {
  const { emailAddress, outlineKeyCreated, keySent } = row;
  const titles = rows[0];
  const emailIndex = titles.findIndex(
    (item) => item?.toLowerCase()?.trim() === "email address",
  );
  const rowIndexToUpdate = rows.findIndex(
    (item: string[]) => item[emailIndex] === emailAddress,
  );
  if (rowIndexToUpdate < 0) {
    return rows;
  }
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
  rows[rowIndexToUpdate] = rowToUpdate;
  return rows;
}

export async function updateSheet(toUpdate: Partial<SheetRow>[]) {
  const spreadsheetId = process.env.NEXT_APP_GOOGLE_SHEET_ID;
  const range = `${process.env.NEXT_APP_GOOGLE_SHEET_NAME}!A:Z`;
  const sheets = gSheet();
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });
  const rows = response.data.values;
  if (!rows?.length) {
    return null;
  }

  const values = toUpdate.reduce((acc, curr) => processRow(acc, curr), rows);
  return sheets.spreadsheets.values.update({
    spreadsheetId,
    range,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values,
    },
  });
}

export default {
  fetchRange,
  newUsers,
  updateSheet,
};
