import { sendVpnKeyEmail } from "@/vpnmanager/lib/email/sender";
import { OutlineUser, SheetRow } from "@/vpnmanager/types";
import spreadsheet, { updateSheet } from "@/vpnmanager/lib/data/spreadsheet";
import { OutlineVPN } from "./outline";
import * as Sentry from "@sentry/nextjs";

export async function processUser(item: SheetRow) {
  const { emailAddress } = item;
  if (!emailAddress) {
    return null;
  }
  const vpnManager = new OutlineVPN({
    apiUrl: process.env.NEXT_APP_VPN_API_URL as string,
  });
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
      return;
    }
  }
  await sendVpnKeyEmail({
    recipient: user?.name ?? "",
    key: user?.accessUrl ?? "",
  });
  return {
    ...item,
    keySent: "Yes",
  };
}

export async function processNewUsers() {
  const users = await spreadsheet.newUsers();
  const promises = users.map((item) => processUser(item));
  const settled = await Promise.allSettled(promises);
  const fulfilled = settled
    .filter((item) => item.status === "fulfilled" && !!item.value)
    .map(({ value }: any) => value);
  if (fulfilled.length) {
    updateSheet(fulfilled);
  }
}
