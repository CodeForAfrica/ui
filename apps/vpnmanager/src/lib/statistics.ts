import { NextApiRequest } from "next/types";
import { OutlineVPN } from "./outline";
import { Filters, Model, Record } from "@/vpnmanager/lib/data/database";

const vpnManager = new OutlineVPN({
  apiUrl: process.env.NEXT_APP_VPN_API_URL as string,
});

function formatDate(date?: Date): string | void {
  if (!date) {
    return;
  }
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
export async function processUserStats() {
  const date: string = formatDate(new Date()) as string;
  const { bytesTransferredByUserId = {} } = await vpnManager.getDataUsage();
  const allUsers = await vpnManager.getUsers();
  const unprocessedUsers: Omit<Record, "ID" | "createdAt">[] = Object.keys(
    bytesTransferredByUserId,
  ).map((key: string) => {
    const userDetails = allUsers.find(({ id }) => id === key);
    const newData = {
      userId: key,
      usage: Math.ceil(bytesTransferredByUserId[key] / 30),
      date,
      cumulativeData: bytesTransferredByUserId[key],
      email: userDetails?.name || "",
    };
    Model.createOrUpdate({ ...newData, createdAt: new Date().toISOString() });
    return newData;
  });
  return unprocessedUsers;
}

export async function getStats(req: NextApiRequest) {
  const filters: Partial<Filters> & {
    "date.start"?: string;
    "date.end"?: string;
  } = req.query;
  const validFilters = {
    email: filters.email,
    ID: filters.ID,
    userId: filters.userId,
    groupBy: filters.groupBy as "email" | "date",
    orderBy: filters.orderBy,
    date:
      filters["date.start"] && filters["date.end"]
        ? {
            start: formatDate(new Date(filters["date.start"])) as string,
            end: formatDate(new Date(filters["date.end"])) as string,
          }
        : (formatDate(
            filters.date ? new Date(filters.date as string) : undefined,
          ) as string),
  };

  console.log(validFilters);
  return Model.getAll(validFilters);
}
