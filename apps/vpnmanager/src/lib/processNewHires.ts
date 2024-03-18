import { sendVpnKeyEmail } from "@/vpnmanager/lib/email/sender";
import { OutlineUser, SheetRow } from "@/vpnmanager/types";
import * as Sentry from "@sentry/nextjs";

import spreadsheet from "./data/spreadsheet";
import { vpnManager } from "./outline";

export async function processEmployee(item: Partial<SheetRow>) {
  const { emailAddress } = item;
  if (!emailAddress) {
    return null;
  }
  let user: OutlineUser | null = null;
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
  await sendVpnKeyEmail({
    recipient: user?.name ?? "",
    key: user?.accessUrl ?? "",
  });
  return user;
}

export async function processNewHires() {
  const newHires = await spreadsheet.newHires();
  const promises = newHires.map((item) => processEmployee(item));
  await Promise.allSettled(promises);
}

processNewHires();
