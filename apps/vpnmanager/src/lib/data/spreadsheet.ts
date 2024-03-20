import { google } from "googleapis";

import { SheetRow } from "@/vpnmanager/types";
import { toCamelCase } from "@/vpnmanager/utils";
import { loadEnvConfig } from "@next/env";

const projectDir = process.cwd();
loadEnvConfig(projectDir);
const SHEET_ID = process.env.NEXT_APP_GOOGLE_SHEET_ID;
const SHEET_NAME = process.env.NEXT_APP_GOOGLE_SHEET_NAME;

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
  const range = `${SHEET_NAME}!A:Z`;
  const data = await list(SHEET_ID, range);
  return data.filter(
    (row: SheetRow) => row.emailAddress && row.keySent?.trim() !== "Yes",
  );
}

function updateRow(rows: string[][], row: Partial<SheetRow>) {
  const { emailAddress, outlineKeyCreated, keySent } = row;
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
  rows[rowIndexToUpdate] = rowToUpdate;
  return rows;
}

export async function updateSheet(toUpdate: Partial<SheetRow>[]) {
  const range = `${SHEET_NAME}!A:Z`;
  const sheets = gSheet();
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range,
  });
  const rows = response.data.values;
  if (!rows?.length) {
    return null;
  }

  const values = toUpdate.reduce((acc, curr) => updateRow(acc, curr), rows);
  const validRange = `${SHEET_NAME}!A:Z`;
  return sheets.spreadsheets.values.update({
    spreadsheetId: SHEET_ID,
    range: validRange,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values,
    },
  });
}

export default {
  list,
  newUsers,
  updateSheet,
};
