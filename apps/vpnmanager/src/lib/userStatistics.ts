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
  const [res] = Model.getAll({
    orderBy: "date DESC",
    userId: outlineId?.toString(),
  }) as Record[];
  return usage - (res?.cumulativeData || 0);
}

function addUserStatsToDb(record: Omit<Record, "ID">) {
  Model.createOrUpdate(record);
}
// Process Daily user stats. Doesn't matter the time of the day, it just updates.
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
    addUserStatsToDb({ ...newData, createdAt: new Date().toISOString() });
    return newData;
  });
  return unprocessedUsers;
}

export async function getStats(
  filters: Partial<Filters> & { "date.start"?: string; "date.end"?: string },
) {
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
