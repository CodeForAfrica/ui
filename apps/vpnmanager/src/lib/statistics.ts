import { NextApiRequest } from "next/types";
import { OutlineVPN } from "./outline";
import { Filters, Model, Record } from "@/vpnmanager/lib/data/database";

interface UserDataUsage {
  outlineId: string | number;
  usage: number;
}

const vpnManager = new OutlineVPN({
  apiUrl: process.env.NEXT_APP_VPN_API_URL as string,
});

function calculateDailyDataUsage(userData: UserDataUsage) {
  if (!userData) {
    return 0;
  }

  const { usage, outlineId } = userData;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const lastWeek = new Date();
  lastWeek.setDate(yesterday.getDate() - 7);
  const [res] = Model.getAll({
    orderBy: "date DESC",
    date: {
      start: `${lastWeek.getFullYear()}-${lastWeek.getMonth() + 1}-${lastWeek.getDate()}`,
      end: `${yesterday.getFullYear()}-${yesterday.getMonth() + 1}-${yesterday.getDate()}`,
    },
    userId: outlineId?.toString(),
  }) as Record[];
  return usage - (res?.cumulativeData || 0);
}

export async function processUserStats() {
  const date = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;
  const { bytesTransferredByUserId = {} } = await vpnManager.getDataUsage();
  const allUsers = await vpnManager.getUsers();
  const unprocessedUsers: Omit<Record, "ID" | "createdAt">[] = Object.keys(
    bytesTransferredByUserId,
  ).map((key: string) => {
    const userDetails = allUsers.find(({ id }) => id === key);
    const newData = {
      userId: key,
      usage: calculateDailyDataUsage({
        outlineId: key,
        usage: bytesTransferredByUserId[key],
      }),
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
            start: filters["date.start"],
            end: filters["date.end"],
          }
        : filters.date,
  };

  return Model.getAll(validFilters);
}
