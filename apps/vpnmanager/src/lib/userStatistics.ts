import { OutlineVPN } from "./outline";
import { Model, Record } from "@/vpnmanager/lib/data/database";

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
  const date = new Date();
  date.setDate(date.getDate() - 1);
  const { usage, outlineId } = userData;
  const [res] = Model.getAll({
    orderBy: "date DESC",
    userId: outlineId?.toString(),
  }) as any[];
  return usage - (res?.cumulativeData || 0);
}

function addUserStatsToDb(record: Omit<Record, "ID">) {
  // Find in DB if userId and date exists then update else create
  const date = new Date();
  const [res] = Model.getAll({
    date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
    userId: record?.userId?.toString(),
  }) as Record[];
  if (res) {
    Model.update(res.ID as number, record);
    return;
  }
  Model.create(record);
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
      accessUrl: userDetails?.accessUrl,
    };
    addUserStatsToDb({ ...newData, createdAt: new Date().toISOString() });
    return newData;
  });
  return unprocessedUsers;
}

export async function getStats(filters: { [key: string]: string }) {
  const validFilters = {
    email: filters.email,
    ID: parseInt(filters.ID),
    userId: filters.userId,
    groupBy: filters.groupBy as "email" | "date",
    orderBy: filters.orderBy,
    dateBetween:
      filters["dateBetween.start"] && filters["dateBetween.end"]
        ? {
            start: filters["dateBetween.start"],
            end: filters["dateBetween.end"],
          }
        : undefined,
  };

  return Model.getAll(validFilters);
}
