export interface OutlineOptions {
  apiUrl: string;
  fingerprint?: string;
}

export interface OutlineUser {
  id: string;
  name: string;
  password: string;
  port: number;
  method: string;
  accessUrl: string;
}

export interface OutlineServer {
  name: string;
  serverId: string;
  metricsEnabled: boolean;
  createdTimestampMs: number;
  version: string;
  portForNewAcccessKeys: number;
  hostnameForNewAccessKeys: string;
}

export interface OutlineDataUsageByUser {
  bytesTransferredByUserId: { [userId: string]: number };
}

export interface OutlineServerMetrics {
  metricsEnabled: boolean;
}

export interface SheetRow {
  emailAddressCreated: string;
  emailAddress: string;
  member: string;
  outlineKeyCreated: string;
  startDate: string;
  endDate: string;
  keySent: "Yes" | "No";
}
