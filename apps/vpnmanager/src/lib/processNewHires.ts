import { SheetRow } from "@/vpnmanager/types";
import * as Sentry from "@sentry/nextjs";

import spreadsheet from "./data/spreadsheet";

export async function processEmployee(item: SheetRow) {
  // Capture to test that it works
  Sentry.captureException(item);
}

export async function processNewHires() {
  const newHires = await spreadsheet.newHires();
  const promises = newHires.map((item) => processEmployee(item));
  Promise.allSettled(promises);
}

processNewHires();
