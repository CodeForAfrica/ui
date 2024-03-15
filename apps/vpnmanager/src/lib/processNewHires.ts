import { SheetRow } from "@/vpnmanager/types";
import * as Sentry from "@sentry/nextjs";

import spreadsheet from "./data/spreadsheet";
import { vpnManager } from "./outline";

export async function processEmployee(item: SheetRow) {
  const { emailAddress } = item;
  if (!emailAddress) {
    return null;
  }
  let user;
  try {
    user = await vpnManager.getKey(emailAddress);
  } catch (error: any) {
    if (error.statusCode !== 404) {
      Sentry.captureException(error);
      return;
    }
  }
  if (!user) {
    try {
      user = await vpnManager.createUser(emailAddress);
    } catch (error: any) {
      Sentry.captureException(error);
    }
  }
  return user;
}

export async function processNewHires() {
  const newHires = await spreadsheet.newHires();
  const promises = newHires.map((item) => processEmployee(item));
  await Promise.allSettled(promises);
}

processNewHires();
