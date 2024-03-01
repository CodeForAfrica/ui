export interface User {
  name: string;
  email: string;
  lastVpnKeySentDate: string;
  status: "Active" | "Inactive";
}

export interface GoogleUser {
  name?: string | null;
  email: string | null;
  avatarUrl: string | null;
}
