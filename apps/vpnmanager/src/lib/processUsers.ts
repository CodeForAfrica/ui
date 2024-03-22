import spreadsheet, { updateSheet } from "@/vpnmanager/lib/data/spreadsheet";
import { SheetRow } from "@/vpnmanager/types";

export async function processUser(item: SheetRow) {
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
    .filter((item) => item.status === "fulfilled")
    .map(({ value }: any) => value);
  if (fulfilled.length) {
    updateSheet(fulfilled);
  }
}
