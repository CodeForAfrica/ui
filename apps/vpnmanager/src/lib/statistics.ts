import { NextApiRequest } from "next/types";
import { OutlineVPN } from "./outline";
import { Filters, Model, Record } from "@/vpnmanager/lib/data/database";
import { formatDate } from "@/vpnmanager/utils/formatDate";

const vpnManager = new OutlineVPN({
  apiUrl: process.env.NEXT_APP_VPN_API_URL as string,
});

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

export async function getStats(
  req: NextApiRequest | { query: NextApiRequest["query"] },
) {
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
  return Model.getAll(validFilters);
}
