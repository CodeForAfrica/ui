import {
  OutlineDataUsageByUser,
  OutlineOptions,
  OutlineServer,
  OutlineServerMetrics,
  OutlineUser,
} from "@/vpnmanager/types";
import { fetchJson } from "@/vpnmanager/utils";

export class OutlineVPN {
  apiUrl: string;
  fingerprint?: string;
  timeout?: number;

  constructor(options: OutlineOptions) {
    this.apiUrl = options.apiUrl;
    this.fingerprint = options.fingerprint;
  }

  public async getServer(): Promise<OutlineServer> {
    return fetchJson.get(`${this.apiUrl}/server`);
  }

  public async renameServer(name: string): Promise<boolean> {
    return fetchJson.put(`${this.apiUrl}/name`, { name });
  }

  public async setDefaultDataLimit(bytes: number): Promise<boolean> {
    return fetchJson.put(`${this.apiUrl}/server/access-key-data-limit`, {
      limit: { bytes },
    });
  }

  public async getUsers(): Promise<OutlineUser[]> {
    const res = await fetchJson.get(`${this.apiUrl}/access-keys`);
    return res.accessKeys;
  }

  public async getKey(email: string): Promise<OutlineUser | null> {
    const users = await this.getUsers();
    return users.find(({ name }) => name === email) ?? null;
  }

  public async getUser(id: string): Promise<OutlineUser | null> {
    return fetchJson.get(`${this.apiUrl}/access-keys/${id}`);
  }

  public async createUser(email: string): Promise<OutlineUser> {
    return fetchJson.post(`${this.apiUrl}/access-keys`, { name: email });
  }

  public async deleteDefaultDataLimit(): Promise<boolean> {
    return fetchJson.delete(`${this.apiUrl}/server/access-key-data-limit`);
  }

  public async setHostnameForAccessKeys(hostname: string): Promise<boolean> {
    return fetchJson.put(`${this.apiUrl}/server/hostname-for-access-keys`, {
      hostname,
    });
  }

  public async setPortForNewAccessKeys(port: number): Promise<boolean> {
    return fetchJson.put(`${this.apiUrl}/server/port-for-new-access-keys`, {
      port,
    });
  }

  public async getDataUsage(): Promise<OutlineDataUsageByUser> {
    return fetchJson.get(`${this.apiUrl}/metrics/transfer`);
  }

  public async getDataUserUsage(id: string): Promise<number> {
    const { bytesTransferredByUserId } = await this.getDataUsage();

    const userUsage = bytesTransferredByUserId[id];

    if (userUsage) {
      return userUsage;
    }
    throw new Error("No user found, check metrics is enabled");
  }

  public async getShareMetrics(): Promise<OutlineServerMetrics> {
    return fetchJson.get(`${this.apiUrl}/metrics/enabled`);
  }

  public async setShareMetrics(metricsEnabled: boolean): Promise<boolean> {
    return fetchJson.put(`${this.apiUrl}/metrics/enabled`, { metricsEnabled });
  }

  public async deleteUser(id: string): Promise<boolean> {
    return fetchJson.delete(`${this.apiUrl}/access-keys/${id}`);
  }

  public async renameUser(id: string, name: string): Promise<boolean> {
    return fetchJson.put(`${this.apiUrl}/access-keys/${id}/name`, { name });
  }

  public async addDataLimit(id: string, bytes: number): Promise<boolean> {
    return fetchJson.put(`${this.apiUrl}/access-keys/${id}/data-limit`, {
      limit: { bytes },
    });
  }

  public async deleteDataLimit(id: string): Promise<boolean> {
    return fetchJson.delete(`${this.apiUrl}/access-keys/${id}/data-limit`);
  }

  public async disableUser(id: string): Promise<boolean> {
    return await this.addDataLimit(id, 0);
  }

  public async enableUser(id: string): Promise<boolean> {
    return await this.deleteDataLimit(id);
  }
}

export default OutlineVPN;
