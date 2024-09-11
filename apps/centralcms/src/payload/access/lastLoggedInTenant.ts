import type { Access, AccessArgs } from "payload";
import { isTenant } from "@/payload/utilities/typeGuards"

export const lastLoggedInTenant: Access = ({ req: { user }, data }: AccessArgs) => {
  if (isTenant(user?.lastLoggedInTenant)) {
    return user.lastLoggedInTenant.id === data?.id;
  }
  return false;
};
