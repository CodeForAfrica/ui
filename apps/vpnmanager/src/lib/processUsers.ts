import { SheetRow } from "@/vpnmanager/types";
import * as Sentry from "@sentry/nextjs";

import spreadsheet, { updateSheet } from "./data/spreadsheet";

export async function processUser(item: SheetRow) {
  Sentry.captureException(item);
  return {
    ...item,
    keySent: "Yes",
  };
}

export async function processNewUsers() {
  const newHires = await spreadsheet.newUsers();
  const promises = newHires.map((item) => processUser(item));
  const settled = await Promise.allSettled(promises);
  const fulfilled = settled
    .filter((item) => item.status === "fulfilled")
    .map(({ value }: any) => value);
  if (fulfilled.length) {
    updateSheet(fulfilled);
  }
}
