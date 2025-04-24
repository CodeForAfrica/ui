import type { PayloadRequest } from "payload";
import { ROLE_ADMIN } from "./roles";

export const isAdmin = ({ req: { user } }: { req: PayloadRequest }) => {
  // Return true or false based on if the user has an admin role
  return Boolean(user?.roles?.includes(ROLE_ADMIN));
};

export const isAdminFieldLevel = ({
  req: { user },
}: {
  req: PayloadRequest;
}) => {
  // Return true or false based on if the user has an admin role
  return Boolean(user?.roles?.includes(ROLE_ADMIN));
};
