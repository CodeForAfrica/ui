import type { PayloadRequest } from "payload";
import { ROLE_ADMIN } from "./roles";

export const isAdminOrSelf = ({ req: { user } }: { req: PayloadRequest }) => {
  // Need to be logged in
  if (user) {
    // If user has role of 'admin'
    if (user.roles?.includes(ROLE_ADMIN)) {
      return true;
    }
    // If any other type of user, only provide access to themselves
    return {
      id: {
        equals: user.id,
      },
    };
  }

  // Reject everyone else
  return false;
};

export const isAdminOrSelfFieldLevel = ({
  id,
  req: { user },
}: {
  id: string;
  req: PayloadRequest;
}) => {
  return user?.roles?.includes(ROLE_ADMIN) || id === user?.id;
};
