import type { Access } from "payload";
import canAccessFromDomain from "@/payload/access/canAccessFromDomain"

export const canRead: Access = ({ req: { user } }) => {
   return canAccessFromDomain(user, "CodeforAfrica");
};
