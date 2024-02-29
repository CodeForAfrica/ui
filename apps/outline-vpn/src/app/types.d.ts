export interface User {
  name: string;
  email: string;
  lastVpnKeySentDate: string;
  status: "Active" | "Inactive";
}
